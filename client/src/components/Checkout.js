import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

function Checkout({ totalPrice }) {
  const onToken = token => {
    console.log(token);
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
