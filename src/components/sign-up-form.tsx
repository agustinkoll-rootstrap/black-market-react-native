import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import z from 'zod';

import { translate } from '@/core';
import { Button, ControlledInput, View } from '@/ui';
import { black } from '@/ui/colors';
import { HeaderLogo } from '@/ui/icons';
import { PasswordInput } from '@/ui/password-input';

const MIN_PASSWORD_LENGTH = 6;

const passwordSchema = z
  .string({ required_error: translate('auth.signUp.error.passwordRequired') })
  .min(MIN_PASSWORD_LENGTH, translate('auth.signUp.error.shortPassword'));

const schema = z
  .object({
    email: z
      .string({ required_error: translate('auth.signUp.error.emailRequired') })
      .email(translate('auth.signUp.error.emailInvalid')),
    name: z.string({
      required_error: translate('auth.signUp.error.nameRequired'),
    }),
    password: passwordSchema,
    passwordConfirmation: z.string({
      required_error: translate(
        'auth.signUp.error.passwordConfirmationRequired',
      ),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: translate('auth.signUp.error.passwordsDoNotMatch'),
    path: ['passwordConfirmation'],
  });

export type FormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isPending?: boolean;
};

export const SignUpForm = ({
  onSubmit = () => {},
  isPending = false,
}: SignUpFormProps) => {
  
  const {
    handleSubmit,
    control,
    formState: { isValid },
    watch,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange', // Ensures validation runs on every change
  });

  const { email, name, password, passwordConfirmation } = watch();
  const isFormIncomplete = !email || !name || !password || !passwordConfirmation;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center gap-4 p-4">
        <HeaderLogo color={black} style={{alignSelf: 'center'}}/>
        <View>
          <ControlledInput
            testID="email-input"
            autoCapitalize="none"
            autoComplete="email"
            control={control}
            name="email"
            label={translate('auth.signUp.fields.email')}
          />
          <ControlledInput
            testID="name-input"
            control={control}
            name="name"
            label={translate('auth.signUp.fields.name')}
          />
          <PasswordInput
            testID="password-input"
            control={control}
            name="password"
            label={translate('auth.signUp.fields.password')}
          />
          <PasswordInput
            testID="password-confirmation-input"
            control={control}
            name="passwordConfirmation"
            label={translate('auth.signUp.fields.password')}
          />
          <Button
            testID="sign-up-button"
            label={translate('auth.signUp.signUpButton')}
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
            disabled={isPending || isFormIncomplete || !isValid}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
