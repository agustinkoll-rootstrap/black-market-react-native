import { useEffect } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useProducts } from '@/api/products/use-products';
import { ProductItemHorizontal } from '@/components/products/product-item-horizontal';

export default function ProductsList() {
  const { data: productsData } = useProducts();

  useEffect(() => {}, [productsData]);

  return (
    <View className="flex-1 bg-background p-4">
      <View className="column flex-1 rounded-[8px] border">
        <FlatList
          className="rounded-[8px] border"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}
          data={productsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItemHorizontal product={item} />}
        ></FlatList>
      </View>
    </View>
  );
}
