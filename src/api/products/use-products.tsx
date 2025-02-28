import { useMutation } from "@tanstack/react-query"; // Ensure correct import
import { createQuery } from 'react-query-kit';

import { RESPONSE_SUCCESS } from '../code-responses';
import { client } from '../common';

export type Product = {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  is_favorite: boolean;
  unit_price: string;
  pictures: string[];
  category: Category;
  subCategories: Category[];
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

async function addToFavorites(productId: number) : Promise<Product> {
  try{
    const result = await client({
      url: `/v1/products/${productId}/favorite`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (result.status !== RESPONSE_SUCCESS) {
      throw new Error(`HTTP error! Status: ${result}`);
    }
    return result.data;
  } catch(e){
    throw new Error(`HTTP error! Status: ${e}`);
  }
}

export const useAddFav = () => useMutation<Product, Error, number>({
    mutationFn: addToFavorites,
  });

const getProducts = async (): Promise<Product[]> => {
  const { data, status } = await client({
    url: '/v1/products',
    method: 'GET',
  });

  if (status !== RESPONSE_SUCCESS) {
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

export const useProducts = createQuery<Product[]>({
  queryKey: ['getProducts'],
  fetcher: getProducts,
});