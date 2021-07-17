import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, deleteItem } from '../redux/cart/cart.action';

const Cart = () => {
  const { cart, totalAmount, totalPrice } = useSelector(state => state.cart);

  const dispatch = useDispatch();

  return (
    <div>
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
                    <td>{item.price}</td>
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
                    <td>{item.price * item.quantity}</td>
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
          <hr />
          <h2 className='text-center'>Total: {totalPrice} VND</h2>
          <hr />
          <div>
            <span>
              {cart.length === 0 && (
                <Link className='btn btn-dark' to='/'>
                  Process to check out
                </Link>
              )}
              {cart.length > 0 && (
                <button className='btn btn-dark'>PAY NOW</button>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
