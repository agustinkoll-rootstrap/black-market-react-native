import { ImagesAssets } from 'assets/image-assets';
import { Image, Text, View } from 'react-native';

export type SaleDescription = {
  title: string;
  description: string;
  imagePath: string;
};

export default function SaleItem({
  saleDescription,
}: {
  saleDescription: SaleDescription;
}) {
  return (
    <View className=" m-4 flex h-[130px] flex-row rounded-lg bg-black">
      <Image
        source={ImagesAssets.sofa}
        className="h-full w-[150px] object-contain"
      />
      <View className="h-full w-px bg-white" />
      <View className="flex-1 flex-col p-4">
        <Text className="text-[16px] font-bold color-white">
          {saleDescription.title}
        </Text>
        <Text className="mt-4 text-[14px] color-white">
          {saleDescription.description}
        </Text>
      </View>
    </View>
  );
}
