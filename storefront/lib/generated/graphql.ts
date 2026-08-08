/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CheckoutErrorCode =
  | 'BILLING_ADDRESS_NOT_SET'
  | 'CHANNEL_INACTIVE'
  | 'CHECKOUT_NOT_FULLY_PAID'
  | 'DELIVERY_METHOD_NOT_APPLICABLE'
  | 'EMAIL_NOT_SET'
  | 'GIFT_CARD_NOT_APPLICABLE'
  | 'GRAPHQL_ERROR'
  | 'INACTIVE_PAYMENT'
  | 'INSUFFICIENT_STOCK'
  | 'INVALID'
  | 'INVALID_SHIPPING_METHOD'
  | 'MISSING_ADDRESS_DATA'
  | 'MISSING_CHANNEL_SLUG'
  | 'NON_EDITABLE_GIFT_LINE'
  | 'NON_REMOVABLE_GIFT_LINE'
  | 'NOT_FOUND'
  | 'NO_LINES'
  | 'PAYMENT_ERROR'
  | 'PRICE_OVERRIDE_REASON_WITHOUT_OVERRIDE'
  | 'PRODUCT_NOT_PUBLISHED'
  | 'PRODUCT_UNAVAILABLE_FOR_PURCHASE'
  | 'QUANTITY_GREATER_THAN_LIMIT'
  | 'REQUIRED'
  | 'SHIPPING_ADDRESS_NOT_SET'
  | 'SHIPPING_CHANGE_FORBIDDEN'
  | 'SHIPPING_METHOD_NOT_APPLICABLE'
  | 'SHIPPING_METHOD_NOT_SET'
  | 'SHIPPING_NOT_REQUIRED'
  | 'TAX_ERROR'
  | 'UNAVAILABLE_VARIANT_IN_CHANNEL'
  | 'UNIQUE'
  | 'VOUCHER_NOT_APPLICABLE'
  | 'ZERO_QUANTITY';

export type CheckoutLineInput = {
  /** Flag that allow force splitting the same variant into multiple lines by skipping the matching logic.  */
  forceNewLine?: boolean | null | undefined;
  /**
   * Fields required to update the object's metadata. Can be read by any API client authorized to read the object it's attached to.
   *
   * Warning: never store sensitive information, including financial data such as credit card details.
   */
  metadata?: Array<MetadataInput> | null | undefined;
  /** Custom price of the item. Can be set only by apps with `HANDLE_CHECKOUTS` permission. When the line with the same variant will be provided multiple times, the last price will be used. */
  price?: unknown;
  /**
   * Reason explaining why a custom `price` was set on the line, for debugging and auditing. Can be set only by apps with `HANDLE_CHECKOUTS` permission and only when the line has a `price` override. Setting a new `price` without a reason clears the previous reason. Blank values are stored as no reason. Limited to 255 characters; longer values are truncated.
   *
   * Added in Saleor 3.23.
   */
  priceOverrideReason?: string | null | undefined;
  /** The number of items purchased. */
  quantity: number;
  /** ID of the product variant. */
  variantId: string | number;
};

export type MetadataInput = {
  /** Key of a metadata item. */
  key: string;
  /** Value of a metadata item. */
  value: string;
};

export type ProductCardFragment = { id: string, name: string, slug: string, thumbnail: { url: string, alt: string | null } | null, pricing: { priceRange: { start: { gross: { amount: number, currency: string } } | null } | null } | null };

export type CheckoutCompleteMutationVariables = Exact<{
  id: string | number;
}>;


export type CheckoutCompleteMutation = { checkoutComplete: { order: { id: string, number: string } | null, errors: Array<{ field: string | null, message: string | null, code: CheckoutErrorCode }> } | null };

export type CheckoutCreateMutationVariables = Exact<{
  channel: string;
  lines: Array<CheckoutLineInput> | CheckoutLineInput;
}>;


export type CheckoutCreateMutation = { checkoutCreate: { checkout: { id: string, totalPrice: { gross: { amount: number, currency: string } } } | null, errors: Array<{ field: string | null, message: string | null, code: CheckoutErrorCode }> } | null };

export type CheckoutLinesAddMutationVariables = Exact<{
  id: string | number;
  lines: Array<CheckoutLineInput> | CheckoutLineInput;
}>;


export type CheckoutLinesAddMutation = { checkoutLinesAdd: { checkout: { id: string, lines: Array<{ id: string, quantity: number, variant: { id: string, name: string } }>, totalPrice: { gross: { amount: number, currency: string } } } | null, errors: Array<{ field: string | null, message: string | null, code: CheckoutErrorCode }> } | null };

export type CategoriesQueryVariables = Exact<{
  first: number;
}>;


export type CategoriesQuery = { categories: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null };

export type ProductDetailsQueryVariables = Exact<{
  slug: string;
  channel: string;
}>;


export type ProductDetailsQuery = { product: { id: string, name: string, slug: string, description: unknown, category: { name: string, slug: string } | null, media: Array<{ url: string, alt: string }> | null, variants: Array<{ id: string, name: string, quantityAvailable: number | null, pricing: { price: { gross: { amount: number, currency: string } } | null } | null }> | null, pricing: { priceRange: { start: { gross: { amount: number, currency: string } } | null } | null } | null } | null };

export type ProductListQueryVariables = Exact<{
  channel: string;
  first: number;
  after?: string | null | undefined;
}>;


export type ProductListQuery = { products: { edges: Array<{ node: { id: string, name: string, slug: string, thumbnail: { url: string, alt: string | null } | null, pricing: { priceRange: { start: { gross: { amount: number, currency: string } } | null } | null } | null } }>, pageInfo: { hasNextPage: boolean, endCursor: string | null } } | null };

export const ProductCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"512"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductCardFragment, unknown>;
export const CheckoutCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckoutComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkoutComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutCompleteMutation, CheckoutCompleteMutationVariables>;
export const CheckoutCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckoutCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lines"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckoutLineInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkoutCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"channel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channel"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lines"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lines"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutCreateMutation, CheckoutCreateMutationVariables>;
export const CheckoutLinesAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckoutLinesAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lines"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckoutLineInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkoutLinesAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"lines"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lines"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutLinesAddMutation, CheckoutLinesAddMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const ProductDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"channel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channel"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantityAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductDetailsQuery, ProductDetailsQueryVariables>;
export const ProductListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channel"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"512"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductListQuery, ProductListQueryVariables>;