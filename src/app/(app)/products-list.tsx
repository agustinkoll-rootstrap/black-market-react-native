import React from 'react';
import { SafeAreaView,ScrollView, Text,View } from 'react-native';

import { FocusAwareStatusBar } from '@/ui';

export default function ProductsList() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <View>
          <Text>Products list</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}