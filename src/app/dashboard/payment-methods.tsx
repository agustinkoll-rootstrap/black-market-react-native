import { ImagesAssets } from 'assets/image-assets';
import { Text, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default function PaymentMethods() {
  return (
    <View className="flex-1 flex-col items-center justify-center bg-white p-8">
      <Text className="text-[22px] font-bold text-black">Payment Methods</Text>
      <View className="mt-8 flex-1 flex-row items-center justify-center">
        <PaymentMethodItem name="PayPal" icon="payPal" />
        <View className="h-full w-px bg-black" />
        <PaymentMethodItem name="Credit Card" icon="creditCard" />
        <View className="h-full w-px bg-black" />
        <PaymentMethodItem name="Bitcoin" icon="btc" />
      </View>
    </View>
  );
}

function PaymentMethodItem({
  name,
  icon,
}: {
  name: string;
  icon: keyof typeof ImagesAssets;
}) {
  return (
    <View className="flex-1 flex-col items-center justify-center">
      <SvgUri width="24" height="24" source={ImagesAssets[icon]} />
      <Text className="mt-6 text-[18px]">{name}</Text>
    </View>
  );
}
