/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { z } from 'zod';

import { Button } from '@/ui';
import { ControlledInput } from '@/ui/input';

const MAX_CITY_LENGTH = 50;
const MAX_STATE_LENGTH = 50;
const MAX_COUNTRY_LENGTH = 50;
const MAX_ADDRESS_LENGTH = 100;
const MAX_POSTAL_CODE_LENGTH = 20;
const MAX_CARD_NUMBER_LENGTH = 20;
const MAX_EXPIRATION_DATE_LENGTH = 5;
const MAX_SECURITY_CODE_LENGTH = 4;

const schema = z.object({
  city: z
    .string()
    .min(1, 'City is required')
    .max(
      MAX_CITY_LENGTH,
      `City must be less than ${MAX_CITY_LENGTH} characters`,
    ),
  state: z
    .string()
    .min(1, 'State is required')
    .max(
      MAX_STATE_LENGTH,
      `State must be less than ${MAX_STATE_LENGTH} characters`,
    ),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(
      MAX_COUNTRY_LENGTH,
      `Country must be less than ${MAX_COUNTRY_LENGTH} characters`,
    ),

  address: z
    .string()
    .min(1, 'Address is required')
    .max(
      MAX_ADDRESS_LENGTH,
      `Address must be less than ${MAX_ADDRESS_LENGTH} characters`,
    ),
  secondAddress: z.string().optional(),

  postalCode: z
    .string()
    .max(
      MAX_POSTAL_CODE_LENGTH,
      `Postal code must be less than ${MAX_POSTAL_CODE_LENGTH} characters`,
    ),

  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .max(
      MAX_CARD_NUMBER_LENGTH,
      `Card number must be less than ${MAX_CARD_NUMBER_LENGTH} characters`,
    ),

  expirationDate: z
    .string()
    .min(1, 'Expiration date is required')
    .max(MAX_EXPIRATION_DATE_LENGTH, `Expiration date must be in MM/YY format`),

  securityCode: z
    .string()
    .regex(/^\d+$/, 'Only numbers are allowed')
    .min(1, 'Security code is required')
    .max(
      MAX_SECURITY_CODE_LENGTH,
      `Security code must be less than ${MAX_SECURITY_CODE_LENGTH} characters`,
    ),
});

export type FormType = z.infer<typeof schema>;

export type AddressFormProps = {
  onSubmit: (data: FormType) => void;
};

export default function AddressForm(props: AddressFormProps) {
  const { handleSubmit, control, watch } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { cardNumber, securityCode, expirationDate } = watch();
  const isFormIncomplete = !cardNumber || !securityCode || !expirationDate;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 flex-col bg-background">
          <Text className="text-[16px] font-bold text-black">
            Please add your shipping address
          </Text>

          <View className="gap-4">
            <View className="mt-4" />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="city"
              label="City *"
              placeholder="Input city"
            />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="state"
              label="State *"
              placeholder="Input state"
            />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="country"
              label="Country *"
              placeholder="Input country"
            />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="address"
              label="Address line 1*"
              placeholder="Input address line 1"
            />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="secondAddress"
              label="Address line 2"
              placeholder="Input address line 2"
            />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="postalCode"
              label="Postal code"
              placeholder="postal code"
            />

            <Text className="text-[16px] font-bold text-black">
              Payment information
            </Text>
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="cardNumber"
              label="Card number"
              placeholder="**** **** **** 9012"
            />
            <ControlledInput
              autoCapitalize="none"
              control={control}
              name="expirationDate"
              label="Expiration date"
              placeholder="MM/YY"
            />
            <ControlledInput
              control={control}
              keyboardType="numeric"
              name="securityCode"
              label="Security code"
              placeholder="***"
              maxLength={4}
            />
          </View>
          <Button
            className="mt-4"
            label="Buy"
            onPress={handleSubmit(props.onSubmit)}
            disabled={isFormIncomplete}
          ></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
