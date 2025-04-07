import { ImagesAssets } from 'assets/image-assets';
import { Image, Text, View } from 'react-native';

export type SaleDescription = {
  title: string;
  description: string;
  imagePath: string;
};

export default function ShippingItem() {
  return (
    <View className=" m-4 flex h-[130px] flex-row rounded-lg bg-black">
      <View className="flex-1 flex-col p-4">
        <Text className="text-[20px] font-bold color-white">
          We upgraded our shipments many levels up.
        </Text>
        <Text className="mt-4 text-[16px] color-white">
          Powered by
          <Text className="text-[16px] text-green-500"> FedEx</Text>
        </Text>
      </View>
      <View className="h-full w-px bg-white" />
      <Image
        source={ImagesAssets.fedex}
        className="h-full w-[150px] object-contain"
      />
    </View>
  );
}
