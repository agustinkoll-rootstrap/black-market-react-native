/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { type Product, useAddFav } from '@/api/products/use-products';
import {
  type ShoppingCartItem,
  useAddToCart,
  useRemoveFromCart,
} from '@/api/shopping-cart/use-shopping-cart';
import { Button } from '@/ui';
import { black } from '@/ui/colors';

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
    <View style={styles.itemsSeparator}>
      <View key={product.id} style={styles.cardContainer}>
        <Image source={{ uri: product.pictures[0] }} style={styles.image} />
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionColumn}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { paddingBottom: 8 }]}>
                {product.title}
              </Text>
              <ProductState state={product.state.toString()}></ProductState>
            </View>
            <Text style={[styles.text, { paddingBottom: 16 }]}>
              {product.unit_price}
            </Text>
          </View>

          <View style={styles.interactionsColumn}>
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
