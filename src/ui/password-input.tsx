import React, { useState } from 'react';
import { type Control, type FieldValues,type Path,useController } from 'react-hook-form';
import { StyleSheet,View } from 'react-native';
import { Eye, EyeOff } from 'react-native-feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Input } from './input';
import { Text } from './text';

interface PasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: object;
}

export function PasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
}: PasswordInputProps<T>) {
 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { field, fieldState } = useController({ control, name, rules });
  
  return (
    <View
      style={{
        display: 'flex',
       
      }}>
      <Text className= 'text-grey-100 mb-1 text-lg dark:text-neutral-100'>
          {label}
      </Text>

      <View style={passwordStyles.container}>
        <Input
          onChangeText={field.onChange}
          value={(field.value as string) || ''}
          className="pl-4 pr-8"
            style={{
              height: 44,
              flex: 1,
              
            }}
            placeholder="********"
            secureTextEntry={!isPasswordVisible}/>
    
        <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={ {height: 44, width: 44, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end'} }>
              {isPasswordVisible ? <EyeOff color="black"  /> : <Eye color="black" />}
            </TouchableOpacity>
      </View>
      <Text className="text-sm text-danger-400 dark:text-danger-600">{fieldState.error?.message}</Text>
    </View>
  );
}

const passwordStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
});
