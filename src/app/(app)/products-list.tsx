import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useProducts } from '@/api/products/use-products';
import { ProductItemHorizontal } from '@/components/products/product-item-horizontal';
import { background } from '@/ui/colors';

export default function ProductsList() {
  const { data: productsData } = useProducts();

  useEffect(() => {}, [productsData]);

  return (
    <View style={styles.backgroundContainer}>
      <View className="column flex-1" style={styles.listContainer}>
        <FlatList
          style={{ borderRadius: 8, borderWidth: 1 }}
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
