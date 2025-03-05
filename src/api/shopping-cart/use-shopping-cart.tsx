import { HttpStatusCode } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import { client, queryClient } from '../common';
import { type Product } from '../products/use-products';

export type ShoppingCartItem = {
  id: number;
  quantity: number;
  totalPriceInShoppingCart: string;
  product: Product;
};

export type LineItem = {
  id: number;
  quantity: number;
  total_price_in_shopping_cart: string;
  product: Product;
};

type Pagination = {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
};

export type ShoppingCart = {
  id: number;
  totalPrice: string;
  lineItems: LineItem[];
  pagination: Pagination;
};

async function addToCart(productId: number): Promise<ShoppingCartItem> {
  try {
    const result = await client({
      url: '/v1/shopping_cart/line_items',
      method: 'POST',
      data: {
        line_item: {
          quantity: 1,
          product_id: productId,
        },
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.status !== HttpStatusCode.Ok) {
      throw new Error(`HTTP error! Status: ${result}`);
    }

    return result.data;
  } catch (e) {
    throw new Error(`HTTP error! Status: ${e}`);
  }
}

async function removeFromCart(lineItemId: number): Promise<boolean> {
  try {
    const result = await client({
      url: `/v1/shopping_cart/line_items/${lineItemId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (
      result.status !== HttpStatusCode.Ok &&
      result.status !== HttpStatusCode.NoContent
    ) {
      throw new Error(`HTTP error! Status: ${result}`);
    }

    queryClient.invalidateQueries({ queryKey: ['getShoppingList'] }); // Refresh cart

    return true;
  } catch (e) {
    throw new Error(`HTTP error! Status: ${e}`);
  }
}

const getShoppingList = async (): Promise<ShoppingCart> => {
  const response = await client({
    url: '/v1/shopping_cart',
    method: 'GET',
  });

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const shoppingCart = await response.data;

  return shoppingCart;
};

export const useAddToCart = createMutation<ShoppingCartItem, number>({
  mutationFn: (variables) => addToCart(variables),
});

export const useRemoveFromCart = createMutation<boolean, number>({
  mutationFn: (variables) => removeFromCart(variables),
});

export const useShoppingCart = createQuery<ShoppingCart>({
  queryKey: ['getShoppingList'],
  fetcher: getShoppingList,
});
