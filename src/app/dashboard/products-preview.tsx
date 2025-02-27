import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useProducts } from "@/api/products/use-products";
import { ProductItem } from "@/components/products/product-item";

export function ProductsPreview() {
  const { data: productsData } = useProducts();
  
  useEffect(() => {}, [productsData]);

  return (
    <View className="column flex-1" style={styles.container}>
     <FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={false} // optional, only required if scroll is vertical
        data={productsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (  
          <ProductItem product = {item} />
        )}>
     </FlatList>
    </View>
  );
}

export const styles = StyleSheet.create({
 container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 24,
  },
});