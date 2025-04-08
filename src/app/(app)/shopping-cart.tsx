import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useShoppingCart } from '@/api/shopping-cart/use-shopping-cart';
import { ProductCartItem } from '@/components/products/product-cart-item';
import { Button } from '@/ui';

export default function ShoppingCart() {
  const { data: productsData } = useShoppingCart();
  const size = productsData?.lineItems?.length ?? 0;
  const router = useRouter();

  useEffect(() => {}, [productsData]);

  return (
    <View className="flex-1 bg-background p-4">
      <View className="column">
        {productsData?.lineItems?.length === 0 ? (
          <Text>No items in the cart</Text>
        ) : (
          <FlatList
            className="rounded-[8px] border"
            style={{ borderRadius: 8, borderWidth: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={false}
            data={productsData?.lineItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View>
                <ProductCartItem shoppingCartItem={item} />
                {index < size - 1 && <View className="h-px w-full bg-black" />}
              </View>
            )}
          />
        )}
        {productsData?.lineItems?.length !== 0 && (
          <View className="flex-1 flex-row justify-between pt-4">
            <Text className="text-[16px] font-bold text-black">
              Total: {productsData?.totalPrice}
            </Text>
            <Button
              label="Go to checkout"
              onPress={() => {
                router.push('/checkout');
              }}
            ></Button>
          </View>
        )}
      </View>
    </View>
  );
}
