import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder, reloadOrderState } from '../redux/order/order.action';
import { message, notification } from 'antd';
import 'antd/dist/antd.css';

function Checkout({ totalPrice }) {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError } = useSelector(state => state.order);

  const onToken = token => {
    dispatch(placeOrder({ token, totalPrice }));
  };

  useEffect(() => { 
    return () => {
      dispatch(reloadOrderState());
    };
  }, []);

  return (
    <>
      {isLoading && message.loading({ content: 'Loading...' })}
      {isSuccess &&
        setTimeout(() => {
          notification.success({
            message: 'Payment successfully 🙌🙌🙌',
            duration: 2,
          });
        }, 1000)}
      {isError &&
        setTimeout(() => {
          notification.error({
            message: 'Some thing went wrong 💥💥💥',
            duration: 2,
          });
        }, 1000)}
      <StripeCheckout
        stripeKey='pk_test_51JDApXGfNS5cf8wmElWntYwIfEUdAmjokx30NrpJqrGePiF3rEyMrE4WcTBMdREZ4rlHWXcbPEPzdfJ61ijsWtSN00J9fnlpav'
        shippingAddress
        amount={totalPrice}
        token={onToken}
        currency='VND'
      >
        <button className='btn btn-dark'>PAY NOW</button>
      </StripeCheckout>
    </>
  );
}

export default Checkout;
