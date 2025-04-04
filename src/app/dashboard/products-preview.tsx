import { useEffect } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useProducts } from '@/api/products/use-products';
import { ProductItemVertical } from '@/components/products/product-item-vertical';

import SaleItem from './sale-item';

export function ProductsPreview() {
  const { data: productsData } = useProducts();

  useEffect(() => {}, [productsData]);

  return (
    <View className="column flex-1 pt-6">
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={false} // optional, only required if scroll is vertical
        data={productsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItemVertical product={item} />}
      ></FlatList>
      <SaleItem
        saleDescription={{
          title: 'Check out our new and restored furniture',
          description: 'Shop today and get a 10% discount!',
          imagePath: 'asd',
        }}
      ></SaleItem>
    </View>
  );
}
