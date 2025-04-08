import { HttpStatusCode } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type CreditCard = {
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
};

type ShippingAddress = {
  city: string;
  country: string;
  line_1: string;
  line_2: string;
  postal_code: string;
  state: string;
};

export type OrderPayload = {
  order: {
    credit_card: CreditCard;
    shipping_address: ShippingAddress;
  };
};

async function makeCheckout(order: OrderPayload): Promise<boolean> {
  try {
    const result = await client({
      url: `/v1/orders`,
      method: 'POST',
      data: order,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (
      result.status !== HttpStatusCode.Ok &&
      result.status !== HttpStatusCode.Created
    ) {
      throw new Error(`HTTP error! Status: ${result}`);
    }
    return result.data;
  } catch (e) {
    throw new Error(`HTTP error! Status: ${e}`);
  }
}

export const useCheckout = createMutation<boolean, OrderPayload>({
  mutationFn: (variables) => makeCheckout(variables),
});
