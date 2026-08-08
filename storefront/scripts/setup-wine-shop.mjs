// One-shot setup of the vinohaus-de sandbox as a wine shop.
// Idempotent: safe to re-run, existing objects are reused.
// Run from storefront/: node scripts/setup-wine-shop.mjs

import { readFile } from "node:fs/promises";
import { config } from "dotenv";

config({ path: ".env.local" });

const API = process.env.NEXT_PUBLIC_SALEOR_API_URL;
const TOKEN = process.env.SALEOR_APP_TOKEN;
if (!API || !TOKEN) {
  console.error("NEXT_PUBLIC_SALEOR_API_URL / SALEOR_APP_TOKEN fehlen in .env.local");
  process.exit(1);
}

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
  if (json.errors?.length) {
    throw new Error(JSON.stringify(json.errors, null, 2));
  }
  return json.data;
}

function checkErrors(label, payload) {
  const errors = payload?.errors;
  if (errors?.length) {
    throw new Error(`${label}: ${JSON.stringify(errors)}`);
  }
}

// --- 1. EUR channel -------------------------------------------------------

const CHANNEL_SLUG = "vinohaus-de";

async function ensureChannel() {
  const existing = await gql(
    `query($slug: String!) { channel(slug: $slug) { id slug isActive } }`,
    { slug: CHANNEL_SLUG }
  ).catch(() => null);

  if (existing?.channel?.id) {
    console.log(`channel ${CHANNEL_SLUG}: exists`);
    return existing.channel.id;
  }

  const data = await gql(
    `mutation($input: ChannelCreateInput!) {
      channelCreate(input: $input) {
        channel { id }
        errors { field message code }
      }
    }`,
    {
      input: {
        name: "Vinohaus DE",
        slug: CHANNEL_SLUG,
        currencyCode: "EUR",
        defaultCountry: "DE",
        isActive: true,
      },
    }
  );
  checkErrors("channelCreate", data.channelCreate);
  console.log(`channel ${CHANNEL_SLUG}: created`);
  return data.channelCreate.channel.id;
}

// --- 2. attributes --------------------------------------------------------

const ATTRIBUTES = [
  {
    slug: "rebsorte",
    name: "Rebsorte",
    inputType: "DROPDOWN",
    values: ["Spätburgunder", "Riesling", "Grauburgunder", "Cabernet Sauvignon", "Chardonnay"],
  },
  {
    slug: "jahrgang",
    name: "Jahrgang",
    inputType: "DROPDOWN",
    values: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  },
  {
    slug: "region",
    name: "Region",
    inputType: "DROPDOWN",
    values: ["Ahr", "Mosel", "Pfalz", "Baden", "Rheingau"],
  },
  { slug: "alkohol", name: "Alkohol", inputType: "PLAIN_TEXT" },
  {
    slug: "volumen",
    name: "Volumen",
    inputType: "DROPDOWN",
    values: ["0,375 l", "0,75 l", "1,5 l"],
  },
];

async function ensureAttribute(def) {
  const found = await gql(
    `query($slug: String!) { attributes(first: 1, filter: { search: $slug }) {
      edges { node { id slug } }
    } }`,
    { slug: def.slug }
  );
  const hit = found.attributes.edges.find((e) => e.node.slug === def.slug);
  if (hit) {
    console.log(`attribute ${def.slug}: exists`);
    return hit.node.id;
  }

  const input = {
    name: def.name,
    slug: def.slug,
    type: "PRODUCT_TYPE",
    inputType: def.inputType,
  };
  if (def.values) input.values = def.values.map((name) => ({ name }));

  const data = await gql(
    `mutation($input: AttributeCreateInput!) {
      attributeCreate(input: $input) {
        attribute { id }
        errors { field message code }
      }
    }`,
    { input }
  );
  checkErrors(`attributeCreate ${def.slug}`, data.attributeCreate);
  console.log(`attribute ${def.slug}: created`);
  return data.attributeCreate.attribute.id;
}

// --- 3. product type ------------------------------------------------------

async function ensureProductType(attrIds) {
  const found = await gql(
    `query { productTypes(first: 20) { edges { node { id slug } } } }`
  );
  const hit = found.productTypes.edges.find((e) => e.node.slug === "wein");
  if (hit) {
    console.log("productType wein: exists");
    return hit.node.id;
  }

  const data = await gql(
    `mutation($input: ProductTypeInput!) {
      productTypeCreate(input: $input) {
        productType { id }
        errors { field message code }
      }
    }`,
    {
      input: {
        name: "Wein",
        slug: "wein",
        kind: "NORMAL",
        hasVariants: true,
        isShippingRequired: true,
        productAttributes: [attrIds.rebsorte, attrIds.jahrgang, attrIds.region, attrIds.alkohol],
        variantAttributes: [attrIds.volumen],
      },
    }
  );
  checkErrors("productTypeCreate", data.productTypeCreate);
  console.log("productType wein: created");
  return data.productTypeCreate.productType.id;
}

// --- 4. categories --------------------------------------------------------

const CATEGORIES = [
  { slug: "rotwein", name: "Rotwein" },
  { slug: "weisswein", name: "Weißwein" },
  { slug: "rose", name: "Rosé" },
  { slug: "sekt", name: "Sekt" },
];

async function ensureCategory(def) {
  const found = await gql(`query($slug: String!) { category(slug: $slug) { id } }`, {
    slug: def.slug,
  });
  if (found.category?.id) {
    console.log(`category ${def.slug}: exists`);
    return found.category.id;
  }
  const data = await gql(
    `mutation($input: CategoryInput!) {
      categoryCreate(input: $input) {
        category { id }
        errors { field message code }
      }
    }`,
    { input: { name: def.name, slug: def.slug } }
  );
  checkErrors(`categoryCreate ${def.slug}`, data.categoryCreate);
  console.log(`category ${def.slug}: created`);
  return data.categoryCreate.category.id;
}

// --- 5. wines -------------------------------------------------------------

const WINES = [
  {
    slug: "spaetburgunder-ahr-2021",
    name: "Spätburgunder Ahr 2021",
    category: "rotwein",
    price: "14.90",
    image: "public/landing/hero-bottle.png",
    attrs: { rebsorte: "Spätburgunder", jahrgang: "2021", region: "Ahr", alkohol: "13,0 % vol" },
    text: "Eleganter Spätburgunder von Steillagen der Ahr. Feine Kirschfrucht, seidige Tannine, langer Abgang.",
  },
  {
    slug: "cabernet-sauvignon-pfalz-2020",
    name: "Cabernet Sauvignon Pfalz 2020",
    category: "rotwein",
    price: "12.50",
    image: "public/landing/bottle-3.png",
    attrs: { rebsorte: "Cabernet Sauvignon", jahrgang: "2020", region: "Pfalz", alkohol: "13,5 % vol" },
    text: "Kraftvoller Cabernet aus der Pfalz. Cassis, dunkle Schokolade und ein Hauch Zedernholz.",
  },
  {
    slug: "riesling-mosel-trocken-2022",
    name: "Riesling Mosel Trocken 2022",
    category: "weisswein",
    price: "9.90",
    image: "public/landing/bottle-1.png",
    attrs: { rebsorte: "Riesling", jahrgang: "2022", region: "Mosel", alkohol: "11,5 % vol" },
    text: "Klassischer Mosel-Riesling: knackige Säure, grüner Apfel, mineralischer Schiefer-Ton.",
  },
  {
    slug: "grauburgunder-pfalz-2023",
    name: "Grauburgunder Pfalz 2023",
    category: "weisswein",
    price: "8.50",
    image: "public/landing/bottle-2.png",
    attrs: { rebsorte: "Grauburgunder", jahrgang: "2023", region: "Pfalz", alkohol: "12,5 % vol" },
    text: "Saftiger Grauburgunder mit Birne und Melone. Unkomplizierter Sommerwein mit Schmelz.",
  },
  {
    slug: "rose-baden-2023",
    name: "Rosé Baden 2023",
    category: "rose",
    price: "11.90",
    image: "public/landing/bottle-2.png",
    attrs: { rebsorte: "Spätburgunder", jahrgang: "2023", region: "Baden", alkohol: "12,0 % vol" },
    text: "Lachsfarbener Rosé aus Spätburgunder-Trauben. Erdbeere, Grapefruit, animierende Frische.",
  },
  {
    slug: "riesling-sekt-brut",
    name: "Riesling Sekt Brut",
    category: "sekt",
    price: "13.90",
    image: "public/landing/bottle-1.png",
    attrs: { rebsorte: "Riesling", jahrgang: "2022", region: "Mosel", alkohol: "12,0 % vol" },
    text: "Traditionelle Flaschengärung, 18 Monate Hefelager. Feine Perlage, Brioche, Zitrus.",
  },
];

function editorJs(text) {
  return JSON.stringify({
    time: 0,
    blocks: [{ id: "intro", type: "paragraph", data: { text } }],
    version: "2.24.3",
  });
}

async function uploadImage(productId, filePath, alt) {
  const bytes = await readFile(filePath);
  const fd = new FormData();
  fd.append(
    "operations",
    JSON.stringify({
      query: `mutation($product: ID!, $image: Upload!, $alt: String) {
        productMediaCreate(input: { product: $product, image: $image, alt: $alt }) {
          errors { field message code }
        }
      }`,
      variables: { product: productId, image: null, alt },
    })
  );
  fd.append("map", JSON.stringify({ 0: ["variables.image"] }));
  fd.append("0", new Blob([bytes], { type: "image/png" }), "bottle.png");

  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: fd,
  });
  const json = await res.json();
  const errors = json.errors ?? json.data?.productMediaCreate?.errors;
  if (errors?.length) throw new Error(`uploadImage: ${JSON.stringify(errors)}`);
}

async function ensureWine(wine, ctx) {
  const found = await gql(
    `query($slug: String!) { product(slug: $slug) { id } }`,
    { slug: wine.slug }
  );
  if (found.product?.id) {
    console.log(`wine ${wine.slug}: exists`);
    return;
  }

  const attributes = [
    { id: ctx.attrIds.rebsorte, values: [wine.attrs.rebsorte] },
    { id: ctx.attrIds.jahrgang, values: [wine.attrs.jahrgang] },
    { id: ctx.attrIds.region, values: [wine.attrs.region] },
    { id: ctx.attrIds.alkohol, plainText: wine.attrs.alkohol },
  ];

  const created = await gql(
    `mutation($input: ProductCreateInput!) {
      productCreate(input: $input) {
        product { id }
        errors { field message code }
      }
    }`,
    {
      input: {
        name: wine.name,
        slug: wine.slug,
        productType: ctx.productTypeId,
        category: ctx.categoryIds[wine.category],
        description: editorJs(wine.text),
        attributes,
      },
    }
  );
  checkErrors(`productCreate ${wine.slug}`, created.productCreate);
  const productId = created.productCreate.product.id;

  const listed = await gql(
    `mutation($id: ID!, $input: ProductChannelListingUpdateInput!) {
      productChannelListingUpdate(id: $id, input: $input) {
        errors { field message code }
      }
    }`,
    {
      id: productId,
      input: {
        updateChannels: [
          {
            channelId: ctx.channelId,
            isPublished: true,
            visibleInListings: true,
            isAvailableForPurchase: true,
          },
        ],
      },
    }
  );
  checkErrors(`productChannelListingUpdate ${wine.slug}`, listed.productChannelListingUpdate);

  const variant = await gql(
    `mutation($input: ProductVariantCreateInput!) {
      productVariantCreate(input: $input) {
        productVariant { id }
        errors { field message code }
      }
    }`,
    {
      input: {
        product: productId,
        sku: `${wine.slug}-075`,
        name: "0,75 l",
        trackInventory: false,
        attributes: [{ id: ctx.attrIds.volumen, values: ["0,75 l"] }],
      },
    }
  );
  checkErrors(`productVariantCreate ${wine.slug}`, variant.productVariantCreate);
  const variantId = variant.productVariantCreate.productVariant.id;

  const priced = await gql(
    `mutation($id: ID!, $input: [ProductVariantChannelListingAddInput!]!) {
      productVariantChannelListingUpdate(id: $id, input: $input) {
        errors { field message code }
      }
    }`,
    { id: variantId, input: [{ channelId: ctx.channelId, price: wine.price }] }
  );
  checkErrors(`variantChannelListingUpdate ${wine.slug}`, priced.productVariantChannelListingUpdate);

  await uploadImage(productId, wine.image, wine.name);
  console.log(`wine ${wine.slug}: created (${wine.price} EUR, image uploaded)`);
}

// --- run ------------------------------------------------------------------

const channelId = await ensureChannel();

const attrIds = {};
for (const def of ATTRIBUTES) {
  attrIds[def.slug] = await ensureAttribute(def);
}

const productTypeId = await ensureProductType(attrIds);

const categoryIds = {};
for (const def of CATEGORIES) {
  categoryIds[def.slug] = await ensureCategory(def);
}

for (const wine of WINES) {
  await ensureWine(wine, { channelId, attrIds, productTypeId, categoryIds });
}

console.log("\nDone. Channel:", CHANNEL_SLUG);
