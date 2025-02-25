import { SafeAreaView,ScrollView, Text,View } from 'react-native';

import { FocusAwareStatusBar } from '@/ui';

export default function Dashboard() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <View>
          <Text>Dashboard</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}