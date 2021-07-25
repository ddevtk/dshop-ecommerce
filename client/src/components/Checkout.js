import React from 'react';
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../redux/order/order.action';

function Checkout({ totalPrice }) {
  const dispatch = useDispatch();
  const onToken = token => {
    dispatch(placeOrder({ token, totalPrice }));
  };
  return (
    <StripeCheckout
      stripeKey='pk_test_51JDApXGfNS5cf8wmElWntYwIfEUdAmjokx30NrpJqrGePiF3rEyMrE4WcTBMdREZ4rlHWXcbPEPzdfJ61ijsWtSN00J9fnlpav'
      shippingAddress
      amount={totalPrice}
      token={onToken}
      currency='VND'
    >
      <button className='btn btn-dark'>PAY NOW</button>
    </StripeCheckout>
  );
}

export default Checkout;
