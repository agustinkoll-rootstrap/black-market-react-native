import { SafeAreaView,ScrollView, Text,View } from 'react-native';

import { FocusAwareStatusBar } from '@/ui';

export default function Fav() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <View>
          <Text>Favourites</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}