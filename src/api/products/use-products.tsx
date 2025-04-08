// Ensure correct import
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { createQuery } from 'react-query-kit';

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

const getProducts = async (): Promise<Product[]> => {
  const { data, status } = await client({
    url: '/v1/products',
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

export const useProducts = createQuery<Product[]>({
  queryKey: ['getProducts'],
  fetcher: getProducts,
});

async function getProductById(productId: number): Promise<Product> {
  const { data, status } = await client({
    url: `/v1/products/${productId}`,
    method: 'GET',
  });

  if (status !== HttpStatusCode.Ok) {
    throw new Error(`HTTP error! Status: ${status}`);
  }

  return data;
}

export const useGetProductById = (productId: number) =>
  useQuery<Product, Error>({
    queryKey: ['productId', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // para evitar que se ejecute con `undefined`
  });
