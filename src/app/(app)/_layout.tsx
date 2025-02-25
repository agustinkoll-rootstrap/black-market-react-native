import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useAuth } from '@/components/providers/auth';
import { useIsFirstTime } from '@/core';
import { View } from '@/ui';
import {
  DashboardIcon,
  Fav as FavIcon,
  HamburguerMenu,
  Products as ProductsIcon,
  Shopping as ShoppingCartIcon,
} from '@/ui/icons';

import Dashboard from './dashboard';

export default function TabLayout() {
  const { isAuthenticated, ready } = useAuth();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (!ready) {
      hideSplash();
    }
  }, [hideSplash, ready]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (!isAuthenticated && ready) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs screenOptions={{ headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle:{backgroundColor: '#000'},
       tabBarActiveTintColor: '#00031A',
      tabBarInactiveTintColor: '#fff', }}>
     <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => ( <TabIcon IconComponent={DashboardIcon} color={color} focused={focused} />),
          headerRight: () => <Dashboard />,
          tabBarTestID: 'dashboard-tab',
        }}
      />
      <Tabs.Screen
        name="products-list"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => ( <TabIcon IconComponent={ProductsIcon} color={color} focused={focused} />),
          tabBarTestID: 'products-list-tab',
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          title: 'My shopping cart',
          tabBarIcon: ({ color, focused }) => (<TabIcon IconComponent={ShoppingCartIcon} color={color} focused={focused} />),
          tabBarTestID: 'shopping-cart-tab',
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          title: 'My Favourites',
          tabBarIcon: ({ color, focused }) =>(<TabIcon IconComponent={FavIcon} color={color} focused={focused} />),
          tabBarTestID: 'favourites-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (<TabIcon IconComponent={HamburguerMenu} color={color} focused={focused} />),
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

function TabIcon({ IconComponent, color, focused }: {
  IconComponent: React.ComponentType<{ color: string }>;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrapper, focused && styles.focusedIcon]}>
      <IconComponent color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
  // A gray circle behind the focused icon
  focusedIcon: {
    backgroundColor: '#E0E0E0', 
  },
});