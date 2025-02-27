import { router } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {ProductsPreview} from '@/app/dashboard/products-preview';
import { translate } from '@/core';
import { FocusAwareStatusBar } from '@/ui';
import { background, blueLink } from '@/ui/colors';

export default function Dashboard() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView style={{ backgroundColor: background }}>
        <SafeAreaView className="flex-1">
          <View>
            <ProductsPreview />
            <View className="flex-1" style={{ marginTop:8, alignItems:'center' }} >
              <TouchableOpacity onPress={() => router.push("/products-list")} >
                <Text className="font-bold" style={{ color: blueLink, fontSize: 16 }} >
                  {translate("dashboard.seeAll")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}