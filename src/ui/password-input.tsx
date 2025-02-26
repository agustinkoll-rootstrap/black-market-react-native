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
  testID?: string;
}

export function PasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  testID,
}: PasswordInputProps<T>) {
 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { field, fieldState } = useController({ control, name, rules });
  
  return (
    <View
      style={{
        display: 'flex',
       width: '100%',
      }}>
      <Text className= 'text-grey-100 text-lg dark:text-neutral-100'>
          {label}
      </Text>

      <View style={passwordStyles.container}>
        <Input
          onChangeText={field.onChange}
          value={(field.value as string) || ''}
          className="pl-2"
            style={{
              height: 40,
              width: 320,
              flex: 1,
              alignSelf: 'center',
            }}
            
            numberOfLines={1}
            multiline={false}
            testID={testID}
            placeholder="*****"
            secureTextEntry={!isPasswordVisible}/>
    
        <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={ {height: 40, width: 40,  justifyContent: 'center',  alignItems:'center', alignSelf: 'flex-end'} }>
              {isPasswordVisible ? <EyeOff color="black"  /> : <Eye color="black" />}
            </TouchableOpacity>
      </View>
      <Text className="text-sm text-danger-400 dark:text-danger-600">{fieldState.error?.message}</Text>
    </View>
  );
}

const passwordStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
  },
});
