import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { useAuth } from '@/components/providers/auth';
import { useIsFirstTime } from '@/core';
import { Pressable, Text } from '@/ui';
import {
  DashboardIcon,
  Fav as FavIcon,
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
    <Tabs>
     <Tabs.Screen
        name="dashboard"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
          headerRight: () => <Dashboard />,
          tabBarTestID: 'dashboard-tab',
        }}
      />
      <Tabs.Screen
        name="products-list"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <ProductsIcon color={color} />,
          tabBarTestID: 'products-list-tab',
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          title: 'My shopping cart',
          tabBarIcon: ({ color }) => <ShoppingCartIcon color={color} />,
          tabBarTestID: 'shopping-cart-tab',
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          title: 'My Favourites',
          tabBarIcon: ({ color }) => <FavIcon color={color} />,
          tabBarTestID: 'favourites-tab',
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => (
  <Link href="/feed/add-post" asChild>
    <Pressable>
      <Text className="px-3 text-primary-300">Create</Text>
    </Pressable>
  </Link>
);
