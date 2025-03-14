import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useShoppingCart } from '@/api/shopping-cart/use-shopping-cart';
import { ProductCartItem } from '@/components/products/product-cart-item';

export default function ShoppingCart() {
  const { data: productsData } = useShoppingCart();

  useEffect(() => {}, [productsData]);

  return (
    <View className="flex-1 bg-background p-4">
      <View className="column flex-1 rounded-[8px] border">
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
