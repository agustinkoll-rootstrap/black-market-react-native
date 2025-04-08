import { Alert, View } from 'react-native';

import { type OrderPayload, useCheckout } from '@/api/checkout//use-checkout';

import AddressForm, { type AddressFormProps } from './checkout/address-form';

export default function Checkout() {
  const { mutate: checkoutMutation } = useCheckout();

  const onSubmit: AddressFormProps['onSubmit'] = (data) => {
    const {
      city,
      state,
      country,
      address,
      secondAddress,
      postalCode,
      cardNumber,
      expirationDate,
      securityCode,
    } = data;
    const orderPayload: OrderPayload = {
      order: {
        credit_card: {
          card_number: cardNumber,
          exp_month: parseInt(expirationDate.split('/')[0]),
          exp_year: parseInt(expirationDate.split('/')[1]),
          cvc: securityCode,
        },
        shipping_address: {
          city,
          state,
          country,
          line_1: address,
          line_2: secondAddress ?? '',
          postal_code: postalCode,
        },
      },
    };
    checkoutMutation(orderPayload, {
      onSuccess: () => {
        Alert.alert('Success', 'Order placed successfully!');
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to place order.');
      },
    });
  };

  return (
    <View className="flex-1 flex-col bg-background p-4">
      <AddressForm onSubmit={onSubmit}></AddressForm>
    </View>
  );
}
