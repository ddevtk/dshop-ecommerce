import axios from 'axios';
import orderActionType from './order.type';

export const placeOrder =
  ({ token, totalPrice }) =>
  async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    try {
      const currentUser = getState().login.user;
      const cart = getState().cart.cart.map(item => {
        return {
          name: item.name,
          _id: item._id,
          price: item.price,
          quantity: item.quantity,
        };
      });

      await axios.post('/api/orders/placeOrder', {
        token,
        totalPrice,
        currentUser,
        cart,
      });

      dispatch({ type: 'PLACE_ORDER_SUCCESS' });
      dispatch({ type: 'EMPTY_CART' });
      localStorage.removeItem('cart');
    } catch (error) {
      dispatch({ type: 'PLACE_ORDER_ERROR' });
    }
  };

export const getOrderByUid = _id => async dispatch => {
  dispatch({ type: orderActionType.GET_ORDER_BY_UID_REQUEST });
  try {
    const res = await axios.post('/api/orders/getOrderByUid', { _id });
    dispatch({
      type: orderActionType.GET_ORDER_BY_UID_SUCCESS,
      payload: res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
  } catch (error) {
    dispatch({ type: orderActionType.GET_ORDER_BY_UID_ERROR });
  }
};

export const getOrderById = orderId => async dispatch => {
  dispatch({ type: orderActionType.GET_ORDER_BY_ID_REQUEST });
  try {
    const res = await axios.post('/api/orders/getOrderById', { orderId });
    dispatch({
      type: orderActionType.GET_ORDER_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: orderActionType.GET_ORDER_BY_ID_ERROR });
  }
};

export const reloadOrderState = () => dispatch => {
  dispatch({ type: 'RELOAD_ORDER_STATE' });
};
