/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment ProductCard on Product {\n  id\n  name\n  slug\n  thumbnail(size: 512) {\n    url\n    alt\n  }\n  pricing {\n    priceRange {\n      start {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n  }\n}": typeof types.ProductCardFragmentDoc,
    "mutation CheckoutComplete($id: ID!) {\n  checkoutComplete(id: $id) {\n    order {\n      id\n      number\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": typeof types.CheckoutCompleteDocument,
    "mutation CheckoutCreate($channel: String!, $lines: [CheckoutLineInput!]!) {\n  checkoutCreate(input: {channel: $channel, lines: $lines}) {\n    checkout {\n      id\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": typeof types.CheckoutCreateDocument,
    "mutation CheckoutLinesAdd($id: ID!, $lines: [CheckoutLineInput!]!) {\n  checkoutLinesAdd(id: $id, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          name\n        }\n      }\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": typeof types.CheckoutLinesAddDocument,
    "query Categories($first: Int!) {\n  categories(first: $first) {\n    edges {\n      node {\n        id\n        name\n        slug\n      }\n    }\n  }\n}": typeof types.CategoriesDocument,
    "query ProductDetails($slug: String!, $channel: String!) {\n  product(slug: $slug, channel: $channel) {\n    id\n    name\n    slug\n    description\n    category {\n      name\n      slug\n    }\n    media {\n      url\n      alt\n    }\n    variants {\n      id\n      name\n      quantityAvailable\n      pricing {\n        price {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n    pricing {\n      priceRange {\n        start {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n  }\n}": typeof types.ProductDetailsDocument,
    "query ProductList($channel: String!, $first: Int!, $after: String) {\n  products(channel: $channel, first: $first, after: $after) {\n    edges {\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": typeof types.ProductListDocument,
};
const documents: Documents = {
    "fragment ProductCard on Product {\n  id\n  name\n  slug\n  thumbnail(size: 512) {\n    url\n    alt\n  }\n  pricing {\n    priceRange {\n      start {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n  }\n}": types.ProductCardFragmentDoc,
    "mutation CheckoutComplete($id: ID!) {\n  checkoutComplete(id: $id) {\n    order {\n      id\n      number\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.CheckoutCompleteDocument,
    "mutation CheckoutCreate($channel: String!, $lines: [CheckoutLineInput!]!) {\n  checkoutCreate(input: {channel: $channel, lines: $lines}) {\n    checkout {\n      id\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.CheckoutCreateDocument,
    "mutation CheckoutLinesAdd($id: ID!, $lines: [CheckoutLineInput!]!) {\n  checkoutLinesAdd(id: $id, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          name\n        }\n      }\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.CheckoutLinesAddDocument,
    "query Categories($first: Int!) {\n  categories(first: $first) {\n    edges {\n      node {\n        id\n        name\n        slug\n      }\n    }\n  }\n}": types.CategoriesDocument,
    "query ProductDetails($slug: String!, $channel: String!) {\n  product(slug: $slug, channel: $channel) {\n    id\n    name\n    slug\n    description\n    category {\n      name\n      slug\n    }\n    media {\n      url\n      alt\n    }\n    variants {\n      id\n      name\n      quantityAvailable\n      pricing {\n        price {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n    pricing {\n      priceRange {\n        start {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n  }\n}": types.ProductDetailsDocument,
    "query ProductList($channel: String!, $first: Int!, $after: String) {\n  products(channel: $channel, first: $first, after: $after) {\n    edges {\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": types.ProductListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCard on Product {\n  id\n  name\n  slug\n  thumbnail(size: 512) {\n    url\n    alt\n  }\n  pricing {\n    priceRange {\n      start {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment ProductCard on Product {\n  id\n  name\n  slug\n  thumbnail(size: 512) {\n    url\n    alt\n  }\n  pricing {\n    priceRange {\n      start {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutComplete($id: ID!) {\n  checkoutComplete(id: $id) {\n    order {\n      id\n      number\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): (typeof documents)["mutation CheckoutComplete($id: ID!) {\n  checkoutComplete(id: $id) {\n    order {\n      id\n      number\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutCreate($channel: String!, $lines: [CheckoutLineInput!]!) {\n  checkoutCreate(input: {channel: $channel, lines: $lines}) {\n    checkout {\n      id\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): (typeof documents)["mutation CheckoutCreate($channel: String!, $lines: [CheckoutLineInput!]!) {\n  checkoutCreate(input: {channel: $channel, lines: $lines}) {\n    checkout {\n      id\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutLinesAdd($id: ID!, $lines: [CheckoutLineInput!]!) {\n  checkoutLinesAdd(id: $id, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          name\n        }\n      }\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): (typeof documents)["mutation CheckoutLinesAdd($id: ID!, $lines: [CheckoutLineInput!]!) {\n  checkoutLinesAdd(id: $id, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          name\n        }\n      }\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Categories($first: Int!) {\n  categories(first: $first) {\n    edges {\n      node {\n        id\n        name\n        slug\n      }\n    }\n  }\n}"): (typeof documents)["query Categories($first: Int!) {\n  categories(first: $first) {\n    edges {\n      node {\n        id\n        name\n        slug\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductDetails($slug: String!, $channel: String!) {\n  product(slug: $slug, channel: $channel) {\n    id\n    name\n    slug\n    description\n    category {\n      name\n      slug\n    }\n    media {\n      url\n      alt\n    }\n    variants {\n      id\n      name\n      quantityAvailable\n      pricing {\n        price {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n    pricing {\n      priceRange {\n        start {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query ProductDetails($slug: String!, $channel: String!) {\n  product(slug: $slug, channel: $channel) {\n    id\n    name\n    slug\n    description\n    category {\n      name\n      slug\n    }\n    media {\n      url\n      alt\n    }\n    variants {\n      id\n      name\n      quantityAvailable\n      pricing {\n        price {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n    pricing {\n      priceRange {\n        start {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductList($channel: String!, $first: Int!, $after: String) {\n  products(channel: $channel, first: $first, after: $after) {\n    edges {\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"): (typeof documents)["query ProductList($channel: String!, $first: Int!, $after: String) {\n  products(channel: $channel, first: $first, after: $after) {\n    edges {\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;