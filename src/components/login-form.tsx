import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import z from 'zod';

import { translate } from '@/core';
import { Button, ControlledInput, Text, View } from '@/ui';
import { black } from '@/ui/colors';
import { HeaderLogo } from '@/ui/icons';
import { PasswordInput } from '@/ui/password-input';


const MIN_CHARS = 6;
const schema = z.object({
  email: z
    .string({
      required_error: translate('auth.signIn.validation.emailRequired'),
    })
    .email(translate('auth.signIn.validation.invalidEmail')),
  password: z
    .string({
      required_error: translate('auth.signIn.validation.passwordRequired'),
    })
    .min(MIN_CHARS, translate('auth.signIn.validation.passwordMinChars')),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  isLoading?: boolean;
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({
  onSubmit = () => {},
  isLoading = false,
}: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    watch,
  } = useForm<FormType>({
      resolver: zodResolver(schema),
      mode: 'onChange', 
  });
  const { email, password } = watch();
  const isFormIncomplete = !email || !password;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 content-center items-center justify-center gap-8 p-4">
        <HeaderLogo color={black}/>
        <View className="column w-full gap-4">
          <ControlledInput
            testID="email-input"
            autoCapitalize="none"
            autoComplete="email"
            control={control}
            name="email"
            label={translate('auth.signIn.fields.email')}
          />
          <PasswordInput
            label={translate('auth.signIn.fields.password')}
            name="password"
            control={control}
          />
          <Button
            testID="login-button"
            label={translate('auth.signIn.buttons.login')}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isFormIncomplete || !isValid}
          />
          <Text>
            {translate('auth.signIn.newAccount')}{' '}
            <Link href="/sign-up" disabled={isLoading}>
              <Text className="font-bold text-black">
                {translate('auth.signIn.buttons.signUp')}
              </Text>
            </Link>
          </Text>
          <Link href="/forgot-password" disabled={isLoading} asChild>
            <Button
              variant="link"
              className="font-bold text-black"
              label={translate('auth.signIn.forgotPasswordButton')}
            />
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
