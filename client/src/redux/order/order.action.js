import axios from 'axios';

export const placeOrder =
  ({ token, subTotal }) =>
  async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    try {
      const currentUser = getState().login.user;
      const cart = getState().cart.cart;

      axios.post('/api/orders/placeOrder', {
        token,
        subTotal,
        currentUser,
        cart,
      });
    } catch (error) {
      dispatch({ type: 'PLACE_ORDER_ERROR' });
    }
  };
