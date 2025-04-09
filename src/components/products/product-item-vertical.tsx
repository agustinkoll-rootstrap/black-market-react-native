import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAddFav } from '@/api/favs/use-fav';
import { type Product } from '@/api/products/use-products';

import { ProductState } from './product-state';

const MAX_TEXT_LENGTH = 12;

function truncateText(text: string, maxLength: number): string {
  const result =
    text.replace(/\s+/g, ' ').length > maxLength
      ? `${text.replace(/\s+/g, ' ').substring(0, maxLength)}...`
      : text.replace(/\s+/g, ' ');
  return result;
}

export function ProductItemVertical({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(product.is_favorite);
  const { mutate: addToFavorites } = useAddFav();
  const router = useRouter();
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    addToFavorites(product.id);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/detail/product-detail/${product.id}`);
      }}
    >
      <View className="m-r-4 elevation-4 mb-2 ml-2 mr-1 flex h-[230px] w-[170px] rounded-[8px] bg-white shadow-sm">
        <Image
          source={{ uri: product.pictures[0] }}
          className="h-[150px] w-full rounded-[8px]"
        />
        <View className="h-px w-full bg-black" />

        <View className="flex-1 flex-col justify-between p-4">
          <View className="flex-1 flex-row content-between items-center justify-between">
            <Text className="flex-1 text-[16px] font-bold color-black">
              {product.unit_price}
            </Text>
            <ProductState state={product.state.toString()}></ProductState>
          </View>

          <View className="flex-1 flex-row content-between  items-center justify-between">
            <Text className="flex-1 text-[16px] font-bold color-black">
              {' '}
              {truncateText(product.title, MAX_TEXT_LENGTH)}
            </Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'} // Filled if favorite, outline otherwise
                size={20}
                color={isFavorite ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
