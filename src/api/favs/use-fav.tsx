import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Product } from '../products/use-products';

async function addToFavorites(productId: number): Promise<Product> {
  try {
    const result = await client({
      url: `/v1/products/${productId}/favorite`,
      method: 'POST',
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

async function removeFromFavorites(productId: number): Promise<boolean> {
  try {
    const result = await client({
      url: `/v1/products/${productId}/favorite`,
      method: 'DELETE',
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

const getFavorites = async (): Promise<Product[]> => {
  const { data, status } = await client({
    url: '/v1/products/favorites',
    method: 'GET',
  });

  if (status !== HttpStatusCode.Ok) {
    throw new Error(`HTTP error! Status: ${status}`);
  }

  return data.data.map((productResponse: Product) => ({
    id: productResponse.id,
    title: productResponse.title,
    description: productResponse.description,
    state: productResponse.state,
    stock: productResponse.stock,
    is_favorite: productResponse.is_favorite,
    unit_price: productResponse.unit_price,
    pictures: productResponse.pictures,
    category: productResponse.category,
    subCategories: productResponse.subCategories,
  }));
};

export const useAddFav = () =>
  useMutation<Product, Error, number>({
    mutationFn: addToFavorites,
  });

export const useRemoveFav = () =>
  useMutation<boolean, Error, number>({
    mutationFn: removeFromFavorites,
  });

export const useFavorites = createQuery<Product[]>({
  queryKey: ['getFavorites'],
  fetcher: getFavorites,
});
