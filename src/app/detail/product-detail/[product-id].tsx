/* eslint-disable no-unused-vars */
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { useGetProductById } from '@/api/products/use-products';

export default function ProductDetail() {
  const { ['product-id']: productId } = useLocalSearchParams();
  const {
    data: product,
    // isLoading,
    // error,
  } = useGetProductById(Number(productId));

  return (
    <View>
      <Text>Product Detail</Text>
      <Text>ID: {productId}</Text>
      <Text>PRODUCT: {product?.description}</Text>
    </View>
  );
}
