import { SafeAreaView,ScrollView, Text,View } from 'react-native';

import { FocusAwareStatusBar } from '@/ui';

export default function ShoppingCart() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <View>
          <Text>Shopping cart</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}