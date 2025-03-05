import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useShoppingCart } from '@/api/shopping-cart/use-shopping-cart';
import { ProductCartItem } from '@/components/products/product-cart-item';
import { background } from '@/ui/colors';

export default function ShoppingCart() {
  const { data: productsData } = useShoppingCart();

  useEffect(() => {}, [productsData]);

  return (
    <View style={styles.backgroundContainer}>
      <View className="column flex-1" style={styles.listContainer}>
        {productsData?.lineItems?.length === 0 ? (
          <Text>No items in the cart</Text>
        ) : (
          <FlatList
            style={{ borderRadius: 8, borderWidth: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={false}
            data={productsData?.lineItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCartItem shoppingCartItem={item} />
            )}
          />
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    borderWidth: 1,
  },
  backgroundContainer: {
    backgroundColor: background,
    flex: 1,
    padding: 16,
  },
});
