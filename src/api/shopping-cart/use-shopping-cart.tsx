// Ensure correct import

import { HttpStatusCode } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type Product } from '../products/use-products';

async function addToCart(productId: number): Promise<Product> {
  try {
    const result = await client({
      url: '/v1/shopping_cart/line_items',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        line_item: {
          quantity: 0,
          product_id: productId,
        },
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

export const useAddToCart = createMutation<Product, number>({
  mutationFn: (variables) => addToCart(variables),
});
