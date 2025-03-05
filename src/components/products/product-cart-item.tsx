/* eslint-disable max-lines-per-function */

import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  type LineItem,
  useAddQuantityToCart,
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
  const { mutate: addQuantityToCartMutation } = useAddQuantityToCart();
  const [quantity, setQuantity] = useState<number>(shoppingCartItem.quantity);

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

  useEffect(() => {
    if (shoppingCartItem.quantity < quantity) {
      addOneElement();
    }
  }, [quantity]);

  const onIncrementTapped = () => {
    setQuantity(quantity + 1);
  };

  const addOneElement = (): void => {
    addQuantityToCartMutation(
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
    <View style={styles.itemsSeparator}>
      <View key={shoppingCartItem.product.id} style={styles.cardContainer}>
        <Image
          source={{ uri: shoppingCartItem.product.pictures[0] }}
          style={styles.image}
        />
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionColumn}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { paddingBottom: 8 }]}>
                {shoppingCartItem.product.title}
              </Text>
              <ProductState
                state={shoppingCartItem.product.state.toString()}
              ></ProductState>
            </View>

            <TouchableOpacity onPress={() => removeFromCart()}>
              <Text
                className="font-bold"
                style={{ color: blueLink, fontSize: 16 }}
              >
                {translate('products.remove')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.interactionsColumn}>
            <Text style={[styles.text, { paddingBottom: 16 }]}>
              {shoppingCartItem.product.unit_price}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => removeFromCart()}>
                <Ionicons name={'trash'} size={25} color={black} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18 }}> {quantity} </Text>
              <TouchableOpacity onPress={() => onIncrementTapped()}>
                <Ionicons name={'add'} size={25} color={black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 1, width: '100%', backgroundColor: black }} />
    </View>
  );
}

export const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    width: '100%',
    height: 160,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16,
  },
  itemsSeparator: {
    flexDirection: 'column',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 8,
  },
  descriptionColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  interactionsColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignContent: 'space-between',
  },
  text: {
    color: black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    color: black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addCartButton: {},
  addCartButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: { width: 100, height: '100%', resizeMode: 'contain' },
});
