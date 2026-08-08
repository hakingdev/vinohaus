import type { Money } from "@/lib/saleor/queries";

const CheckoutFragment = /* GraphQL */ `
  fragment CheckoutFields on Checkout {
    id
    email
    quantity
    subtotalPrice {
      gross {
        amount
        currency
      }
    }
    shippingPrice {
      gross {
        amount
        currency
      }
    }
    totalPrice {
      gross {
        amount
        currency
      }
    }
    shippingAddress {
      firstName
      lastName
      streetAddress1
      postalCode
      city
      phone
      country {
        code
      }
    }
    deliveryMethod {
      ... on ShippingMethod {
        id
        name
      }
    }
    shippingMethods {
      id
      name
      price {
        amount
        currency
      }
    }
    lines {
      id
      quantity
      totalPrice {
        gross {
          amount
          currency
        }
      }
      variant {
        id
        name
        product {
          name
          slug
          thumbnail(size: 256) {
            url
            alt
          }
        }
      }
    }
  }
`;

export type CheckoutAddress = {
  firstName: string;
  lastName: string;
  streetAddress1: string;
  postalCode: string;
  city: string;
  phone: string | null;
  country: { code: string };
};

export type CheckoutLine = {
  id: string;
  quantity: number;
  totalPrice: { gross: Money };
  variant: {
    id: string;
    name: string;
    product: {
      name: string;
      slug: string;
      thumbnail: { url: string; alt: string | null } | null;
    };
  };
};

export type Checkout = {
  id: string;
  email: string | null;
  quantity: number;
  subtotalPrice: { gross: Money };
  shippingPrice: { gross: Money };
  totalPrice: { gross: Money };
  shippingAddress: CheckoutAddress | null;
  deliveryMethod: { id: string; name: string } | null;
  shippingMethods: { id: string; name: string; price: Money }[];
  lines: CheckoutLine[];
};

export type MutationErrors = { errors: { field: string | null; message: string | null; code: string }[] };

export const CheckoutQuery = /* GraphQL */ `
  ${CheckoutFragment}
  query CheckoutDetails($id: ID!) {
    checkout(id: $id) {
      ...CheckoutFields
    }
  }
`;
export type CheckoutQueryResult = { checkout: Checkout | null };

export const CheckoutCreateMutation = /* GraphQL */ `
  mutation CheckoutCreate($channel: String!, $lines: [CheckoutLineInput!]!) {
    checkoutCreate(input: { channel: $channel, lines: $lines }) {
      checkout {
        id
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutCreateResult = {
  checkoutCreate: MutationErrors & { checkout: { id: string } | null };
};

export const CheckoutLinesAddMutation = /* GraphQL */ `
  mutation CheckoutLinesAdd($id: ID!, $lines: [CheckoutLineInput!]!) {
    checkoutLinesAdd(id: $id, lines: $lines) {
      checkout {
        id
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutLinesAddResult = {
  checkoutLinesAdd: MutationErrors & { checkout: { id: string } | null };
};

export const CheckoutLinesUpdateMutation = /* GraphQL */ `
  mutation CheckoutLinesUpdate($id: ID!, $lines: [CheckoutLineUpdateInput!]!) {
    checkoutLinesUpdate(id: $id, lines: $lines) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutLinesUpdateResult = { checkoutLinesUpdate: MutationErrors };

export const CheckoutLinesDeleteMutation = /* GraphQL */ `
  mutation CheckoutLinesDelete($id: ID!, $linesIds: [ID!]!) {
    checkoutLinesDelete(id: $id, linesIds: $linesIds) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutLinesDeleteResult = { checkoutLinesDelete: MutationErrors };

export const CheckoutEmailUpdateMutation = /* GraphQL */ `
  mutation CheckoutEmailUpdate($id: ID!, $email: String!) {
    checkoutEmailUpdate(id: $id, email: $email) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutEmailUpdateResult = { checkoutEmailUpdate: MutationErrors };

export const CheckoutShippingAddressUpdateMutation = /* GraphQL */ `
  mutation CheckoutShippingAddressUpdate($id: ID!, $address: AddressInput!) {
    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutShippingAddressUpdateResult = {
  checkoutShippingAddressUpdate: MutationErrors;
};

export const CheckoutBillingAddressUpdateMutation = /* GraphQL */ `
  mutation CheckoutBillingAddressUpdate($id: ID!, $address: AddressInput!) {
    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutBillingAddressUpdateResult = {
  checkoutBillingAddressUpdate: MutationErrors;
};

export const CheckoutDeliveryMethodUpdateMutation = /* GraphQL */ `
  mutation CheckoutDeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {
    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {
      errors {
        field
        message
        code
      }
    }
  }
`;
export type CheckoutDeliveryMethodUpdateResult = {
  checkoutDeliveryMethodUpdate: MutationErrors;
};
