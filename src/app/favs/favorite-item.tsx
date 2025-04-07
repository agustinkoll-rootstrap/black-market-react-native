/* eslint-disable max-lines-per-function */

import { Alert, Image, Text, View } from 'react-native';

import { useRemoveFav } from '@/api/favs/use-fav';
import { type Product } from '@/api/products/use-products';
import { ProductState } from '@/components/products/product-state';
import { Button } from '@/ui';

export function FavoriteItem({ product }: { product: Product }) {
  const { mutate: removeFavMutation } = useRemoveFav();

  const removeFromFav = (): void => {
    removeFavMutation(product.id, {
      onSuccess: () => {
        Alert.alert('Success', 'Product removed from cart!');
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to add product to cart.');
      },
    });
  };

  return (
    <View>
      <View
        key={product.id}
        className="flex h-[180px]  w-full flex-row bg-white p-4"
      >
        <Image
          source={{ uri: product.pictures[0] }}
          className="h-full w-[120px] object-contain"
        />
        <View className="flex-1 flex-row justify-between pl-4">
          <View className="flex-1 flex-col">
            <View className="flex-1">
              <Text className="pb-2 text-[16px] font-bold text-black">
                {product.title}
              </Text>
              <ProductState state={product.state.toString()}></ProductState>
            </View>
          </View>

          <View className="ml-4 flex-col items-end justify-between">
            <Text className=" text-[16px] font-bold text-black">
              {product.unit_price}
            </Text>

            <View className="mt-8 flex-row items-center justify-center">
              <Button
                className="h-auto rounded-[4px] border border-black bg-white px-4 py-2 text-black"
                label="Remove"
                textClassName="text-black"
                onPress={removeFromFav}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="h-px w-full bg-black" />
    </View>
  );
}
