import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../redux/order/order.action';

function OrderInfo() {
  const params = useParams();
  const dispatch = useDispatch();

  const { singleOrder } = useSelector(state => state.singleOrder);

  useEffect(() => {
    dispatch(getOrderById(params.orderId));
  }, []);

  return <div>Hello from order info</div>;
}

export default OrderInfo;
