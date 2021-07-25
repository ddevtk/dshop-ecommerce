import { cartActionType } from './cart.type';

export const addToCart = (quantity, product) => (dispatch, getState) => {
  const cartItem = {
    name: product.name,
    _id: product._id,
    price: product.price,
    stock: product.countInStock,
    quantity: quantity * 1,
  };

  dispatch({ type: cartActionType.ADD_TO_CART, payload: cartItem });

  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

export const deleteItem = id => (dispatch, getState) => {
  dispatch({ type: cartActionType.DELETE_ITEM, payload: id });

  localStorage.setItem('cart', JSON.stringify(getState().cart));
};
