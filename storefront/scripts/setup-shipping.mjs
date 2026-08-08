// Shipping setup for the vinohaus-de channel: warehouse link, DE zone,
// two delivery methods. Idempotent. Run from storefront/:
//   node scripts/setup-shipping.mjs

import { config } from "dotenv";

config({ path: ".env.local" });

const API = process.env.NEXT_PUBLIC_SALEOR_API_URL;
const TOKEN = process.env.SALEOR_APP_TOKEN;

async function gql(query, variables) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

function checkErrors(label, payload) {
  if (payload?.errors?.length) {
    throw new Error(`${label}: ${JSON.stringify(payload.errors)}`);
  }
}

const ZONE_NAME = "Deutschland";
const METHODS = [
  { name: "DHL Standard (2-4 Werktage)", price: "4.90" },
  { name: "DHL Express (1-2 Werktage)", price: "9.90" },
];

// resolve channel + warehouse
const base = await gql(`{
  channel(slug: "vinohaus-de") { id warehouses { id name } }
  warehouses(first: 10) { edges { node { id name } } }
  shippingZones(first: 20) { edges { node { id name } } }
}`);

const channel = base.channel;
if (!channel) throw new Error("channel vinohaus-de not found");

const warehouse =
  base.warehouses.edges.find((e) => e.node.name === "Europe")?.node ??
  base.warehouses.edges[0]?.node;
if (!warehouse) throw new Error("no warehouse found");

// 1. link warehouse to the channel
if (!channel.warehouses.some((w) => w.id === warehouse.id)) {
  const upd = await gql(
    `mutation($id: ID!, $input: ChannelUpdateInput!) {
      channelUpdate(id: $id, input: $input) { errors { field message code } }
    }`,
    { id: channel.id, input: { addWarehouses: [warehouse.id] } }
  );
  checkErrors("channelUpdate", upd.channelUpdate);
  console.log(`warehouse "${warehouse.name}": linked to channel`);
} else {
  console.log(`warehouse "${warehouse.name}": already linked`);
}

// 2. shipping zone for DE
let zoneId = base.shippingZones.edges.find((e) => e.node.name === ZONE_NAME)?.node.id;
if (zoneId) {
  console.log(`zone ${ZONE_NAME}: exists`);
} else {
  const created = await gql(
    `mutation($input: ShippingZoneCreateInput!) {
      shippingZoneCreate(input: $input) {
        shippingZone { id }
        errors { field message code }
      }
    }`,
    {
      input: {
        name: ZONE_NAME,
        countries: ["DE"],
        addWarehouses: [warehouse.id],
        addChannels: [channel.id],
      },
    }
  );
  checkErrors("shippingZoneCreate", created.shippingZoneCreate);
  zoneId = created.shippingZoneCreate.shippingZone.id;
  console.log(`zone ${ZONE_NAME}: created`);
}

// 3. delivery methods with channel prices
const zone = await gql(
  `query($id: ID!) {
    shippingZone(id: $id) { shippingMethods { id name } }
  }`,
  { id: zoneId }
);
const existingMethods = zone.shippingZone.shippingMethods ?? [];

for (const method of METHODS) {
  if (existingMethods.some((m) => m.name === method.name)) {
    console.log(`method "${method.name}": exists`);
    continue;
  }
  const created = await gql(
    `mutation($input: ShippingPriceInput!) {
      shippingPriceCreate(input: $input) {
        shippingMethod { id }
        errors { field message code }
      }
    }`,
    { input: { name: method.name, shippingZone: zoneId, type: "PRICE" } }
  );
  checkErrors(`shippingPriceCreate ${method.name}`, created.shippingPriceCreate);
  const methodId = created.shippingPriceCreate.shippingMethod.id;

  const listed = await gql(
    `mutation($id: ID!, $input: ShippingMethodChannelListingInput!) {
      shippingMethodChannelListingUpdate(id: $id, input: $input) {
        errors { field message code }
      }
    }`,
    {
      id: methodId,
      input: { addChannels: [{ channelId: channel.id, price: method.price }] },
    }
  );
  checkErrors(`channelListing ${method.name}`, listed.shippingMethodChannelListingUpdate);
  console.log(`method "${method.name}": created (${method.price} EUR)`);
}

console.log("\nDone.");
