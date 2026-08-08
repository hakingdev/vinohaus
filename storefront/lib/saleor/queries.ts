// Hand-written queries and result types for the skeleton.
// Once `npm run codegen` is set up against a live Saleor instance,
// replace these with generated types from lib/generated/.

export type Money = { amount: number; currency: string };

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  thumbnail: { url: string; alt: string | null } | null;
  pricing: { priceRange: { start: { gross: Money } | null } | null } | null;
};

const ProductCardFragment = /* GraphQL */ `
  fragment ProductCardFragment on Product {
    id
    name
    slug
    thumbnail(size: 512) {
      url
      alt
    }
    pricing {
      priceRange {
        start {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
`;

export const ProductListQuery = /* GraphQL */ `
  ${ProductCardFragment}
  query ProductList($channel: String!, $first: Int!) {
    products(channel: $channel, first: $first) {
      edges {
        node {
          ...ProductCardFragment
        }
      }
    }
  }
`;

export type ProductListResult = {
  products: { edges: { node: ProductCardData }[] } | null;
};

export const ProductDetailsQuery = /* GraphQL */ `
  query ProductDetails($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      category {
        name
        slug
      }
      media {
        url
        alt
      }
      variants {
        id
        name
        quantityAvailable
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
    }
  }
`;

export type ProductDetailsResult = {
  product:
    | {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        category: { name: string; slug: string } | null;
        media: { url: string; alt: string | null }[];
        variants:
          | {
              id: string;
              name: string;
              quantityAvailable: number | null;
              pricing: { price: { gross: Money } | null } | null;
            }[]
          | null;
        pricing: { priceRange: { start: { gross: Money } | null } | null } | null;
      }
    | null;
};

export const CategoryProductsQuery = /* GraphQL */ `
  ${ProductCardFragment}
  query CategoryProducts($slug: String!, $channel: String!, $first: Int!) {
    category(slug: $slug) {
      id
      name
      slug
      products(channel: $channel, first: $first) {
        edges {
          node {
            ...ProductCardFragment
          }
        }
      }
    }
  }
`;

export type CategoryProductsResult = {
  category:
    | {
        id: string;
        name: string;
        slug: string;
        products: { edges: { node: ProductCardData }[] } | null;
      }
    | null;
};

export const SearchProductsQuery = /* GraphQL */ `
  ${ProductCardFragment}
  query SearchProducts($channel: String!, $query: String!, $first: Int!) {
    products(channel: $channel, first: $first, filter: { search: $query }) {
      edges {
        node {
          ...ProductCardFragment
        }
      }
    }
  }
`;

export type SearchProductsResult = ProductListResult;
