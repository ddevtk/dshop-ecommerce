import axios from 'axios';

export const placeOrder =
  ({ token, totalPrice }) =>
  async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    try {
      const currentUser = getState().login.user;
      const cart = getState().cart.cart;

      const res = await axios.post('/api/orders/placeOrder', {
        token,
        totalPrice,
        currentUser,
        cart,
      });
      console.log(res);
    } catch (error) {
      dispatch({ type: 'PLACE_ORDER_ERROR' });
    }
  };
