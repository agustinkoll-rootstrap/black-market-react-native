/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAddFav } from '@/api/favs/use-fav';
import { type Product } from '@/api/products/use-products';
import {
  type ShoppingCartItem,
  useAddToCart,
  useRemoveFromCart,
} from '@/api/shopping-cart/use-shopping-cart';
import { Button } from '@/ui';

import { ProductState } from './product-state';

export function ProductItemHorizontal({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(product.is_favorite);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [lineItemId, setLineId] = useState<number>(-1);
  const { mutate: addToFavorites } = useAddFav();
  const { mutate: addToCartMutation } = useAddToCart<ShoppingCartItem>();
  const { mutate: removeFromCartMutation } = useRemoveFromCart();

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    addToFavorites(product.id);
  };

  const toggleCart = () => {
    if (isInCart) {
      removeFromCart();
    } else {
      addToCart();
    }
  };

  const addToCart = (): void => {
    setIsInCart(true);
    addToCartMutation(product.id, {
      onSuccess: (data: ShoppingCartItem) => {
        setLineId(data.id);
        Alert.alert('Success', 'Product added to cart!');
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to add product to cart.');
      },
    });
  };

  const removeFromCart = (): void => {
    setIsInCart(false);
    removeFromCartMutation(lineItemId, {
      onSuccess: () => {
        Alert.alert('Success', 'Product added to cart!');
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to add product to cart.');
      },
    });
  };

  return (
    <View className="flex-col">
      <View
        className="flex h-[160px] w-full flex-row bg-white"
        key={product.id}
      >
        <Image
          source={{ uri: product.pictures[0] }}
          className="h-full w-[100px] object-contain"
          style={{ resizeMode: 'contain' }}
        />
        <View className="flex-1 flex-row content-between p-4">
          <View className="flex-1 flex-col">
            <View className="flex-1">
              <Text className="pb-4 text-[16px] font-bold color-black">
                {product.title}
              </Text>
              <ProductState state={product.state.toString()}></ProductState>
            </View>
            <Text className="pb-4 text-[16px] font-bold color-black">
              {product.unit_price}
            </Text>
          </View>

          <View className="flex-1 flex-col content-between items-end justify-between">
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={40}
                color={isFavorite ? 'red' : 'gray'}
              />
            </TouchableOpacity>
            <Text>Stock: {product.stock}</Text>
            <Button
              label={isInCart === true ? 'Remove' : 'Add to cart'}
              onPress={toggleCart}
            />
          </View>
        </View>
      </View>
      <View className="h-px w-full bg-black" />
    </View>
  );
}
