import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../redux/order/order.action';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { formatPrice } from '../utils/formatPrice';

function OrderInfo() {
  const params = useParams();
  const dispatch = useDispatch();

  const { singleOrder, isLoading, isError } = useSelector(
    state => state.singleOrder
  );
  console.log(singleOrder);

  useEffect(() => {
    dispatch(getOrderById(params.orderId));
  }, []);

  return (
    <div className='row justify-content-center' style={{ marginTop: '10px' }}>
      {isError && <Error />}
      {isLoading && <Loading />}
      {!isLoading && singleOrder && (
        <>
          <div className='col-md-5 card'>
            <h2>My order</h2>
            <hr />
            {singleOrder[0].orderItems.map(item => {
              const { name, price, quantity } = item;
              return (
                <Fragment>
                  <div className='order-item'>
                    <h1>{name}</h1>
                    <h1>Quantity: {quantity}</h1>
                    <h1>
                      Price:
                      {` ${formatPrice(price)} * ${quantity} = ${formatPrice(
                        price * quantity
                      )}`}
                    </h1>
                  </div>
                  <hr />
                </Fragment>
              );
            })}
          </div>
          <div className='col-md-5 card' style={{ textAlign: 'right' }}>
            <h2>Order Details</h2>
            <hr />
            <h1>Order ID: {singleOrder[0]._id}</h1>
            <h1>Total price: {formatPrice(singleOrder[0].totalPrice)}</h1>
            <h1>Date of order: {singleOrder[0].createdAt.substring(0, 10)}</h1>
            <h1>Transaction ID: {singleOrder[0].transactionId}</h1>
            <h1>{singleOrder[0].isDelivered ? 'Delivered' : 'Order placed'}</h1>
            <hr />
            <h2>Shipping Details</h2>
            <hr />
            <h1>Address: {singleOrder[0].shippingAddress.address}</h1>
            <h1>City: {singleOrder[0].shippingAddress.city}</h1>
            <h1>Country: {singleOrder[0].shippingAddress.country}</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderInfo;
