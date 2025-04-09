import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useFavorites } from '@/api/favs/use-fav';

import { FavoriteItem } from '../favs/favorite-item';

export default function FavoritesPage() {
  const { data: productsData } = useFavorites();

  useEffect(() => {}, [productsData]);

  return (
    <View className="flex-1 bg-background p-4">
      <View className="column flex-1 rounded-[8px] border">
        {productsData?.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-[16px] font-bold text-black">
              No Favorite Items
            </Text>
          </View>
        ) : (
          <FlatList
            style={{ borderRadius: 8, borderWidth: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={false}
            data={productsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FavoriteItem product={item} />}
          />
        )}
      </View>
    </View>
  );
}
