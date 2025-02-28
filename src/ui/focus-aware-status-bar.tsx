import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { darkViolet } from './colors';

type Props = React.ComponentProps<typeof StatusBar>;
export const FocusAwareStatusBar = (props: Props) => {
  const isFocused = useIsFocused();
 

  return isFocused ? <StatusBar style='light' backgroundColor={darkViolet} {...props} /> : null;
};
