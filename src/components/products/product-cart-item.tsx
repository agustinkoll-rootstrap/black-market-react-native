/* eslint-disable max-lines-per-function */

import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  type LineItem,
  useModifyQuantityToCart,
  useRemoveFromCart,
} from '@/api/shopping-cart/use-shopping-cart';
import { translate } from '@/core';
import { black, blueLink } from '@/ui/colors';

import { ProductState } from './product-state';

export function ProductCartItem({
  shoppingCartItem,
}: {
  shoppingCartItem: LineItem;
}) {
  const { mutate: removeFromCartMutation } = useRemoveFromCart();
  const { mutate: modifyQuantityMutation } = useModifyQuantityToCart();

  const removeFromCart = (): void => {
    removeFromCartMutation(shoppingCartItem.id, {
      onSuccess: () => {
        Alert.alert('Success', 'Product removed from cart!');
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to add product to cart.');
      },
    });
  };

  const onIncrementTapped = () => {
    const newQuantity = shoppingCartItem.quantity + 1;
    modifyElementQuantity(newQuantity);
  };

  const onDecrementTapped = () => {
    const newQuantity = shoppingCartItem.quantity - 1;
    if (newQuantity === 0) {
      removeFromCart();
    } else {
      modifyElementQuantity(newQuantity);
    }
  };

  const modifyElementQuantity = (quantity: number): void => {
    modifyQuantityMutation(
      { lineItemId: shoppingCartItem.id, newQuantity: quantity },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Incremented quantity');
        },
        onError: (error) => {
          Alert.alert(
            'Error',
            error?.message || 'Failed to increment quantity in cart.',
          );
        },
      },
    );
  };

  return (
    <View>
      <View
        key={shoppingCartItem.product.id}
        className="flex h-[160px]  w-full flex-row bg-white p-4"
      >
        <Image
          source={{ uri: shoppingCartItem.product.pictures[0] }}
          className="h-full w-[120px] object-contain"
        />
        <View className="flex-1 flex-row justify-between p-4">
          <View className="flex-1 flex-col">
            <View className="flex-1">
              <Text className="pb-2 text-[16px] font-bold text-black">
                {shoppingCartItem.product.title}
              </Text>
              <ProductState
                state={shoppingCartItem.product.state.toString()}
              ></ProductState>
            </View>

            <TouchableOpacity onPress={() => removeFromCart()}>
              <Text
                className="text-[16px] font-bold"
                style={{ color: blueLink }}
              >
                {translate('products.remove')}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col content-between items-end justify-between">
            <Text className="p-4 text-[16px] font-bold text-black">
              {shoppingCartItem.product.unit_price}
            </Text>

            <View className="flex-row items-center justify-center">
              <TouchableOpacity onPress={() => onDecrementTapped()}>
                <Ionicons name={'trash'} size={25} color={black} />
              </TouchableOpacity>
              <Text className="text-[18px]"> {shoppingCartItem.quantity} </Text>
              <TouchableOpacity onPress={() => onIncrementTapped()}>
                <Ionicons name={'add'} size={25} color={black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
