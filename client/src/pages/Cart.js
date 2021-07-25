import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { addToCart, deleteItem } from '../redux/cart/cart.action';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const { cart, totalPrice } = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className='row mt-3 justify-content-center'>
      <div className='col-md-8 card text-center shadow p-3 mb-5 bg-white rounded'>
        <h2 className='text-center m-5'>MY CART</h2>
        <table className='table table-bordered table-responsives-sm'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <select
                      value={item.quantity}
                      onChange={e => {
                        dispatch(addToCart(e.target.value, item));
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {Array.from({ length: item.stock }, (value, idx) => {
                        return (
                          <option key={idx + 1} value={idx + 1}>
                            {idx + 1}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                  <td style={{ cursor: 'pointer' }}>
                    <i
                      className='far fa-trash-alt'
                      style={{ color: 'red' }}
                      onClick={() => {
                        dispatch(deleteItem(item._id));
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2 className='text-center'>{`Total: ${formatPrice(totalPrice)}`}</h2>
        <hr />
        <div>
          <span>
            {cart.length === 0 && (
              <Link className='btn btn-dark' to='/'>
                Process to check out
              </Link>
            )}
            {cart.length > 0 && !currentUser && (
              <Link className='btn btn-dark' to='/login'>
                Login to payment
              </Link>
            )}
            {cart.length > 0 && currentUser && (
              <Checkout totalPrice={totalPrice} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
