/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/dashboard` | `/(app)/favorites-page` | `/(app)/products-list` | `/(app)/settings` | `/(app)/shopping-cart` | `/_sitemap` | `/dashboard` | `/dashboard/payment-methods` | `/dashboard/products-preview` | `/dashboard/sale-item` | `/dashboard/shipping-method` | `/favorites-page` | `/favs/favorite-item` | `/feed/add-post` | `/forgot-password` | `/onboarding` | `/products-list` | `/settings` | `/shopping-cart` | `/sign-in` | `/sign-up` | `/www`;
      DynamicRoutes: `/feed/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/feed/[id]`;
    }
  }
}
