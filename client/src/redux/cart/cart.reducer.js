import { cartActionType } from './cart.type';

const initialState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionType.ADD_TO_CART:
      let { cart, totalAmount, totalPrice } = state;
      const existedItem = cart.find(item => item._id === action.payload._id);

      if (existedItem) {
        existedItem.quantity = action.payload.quantity;
        totalPrice = cart
          .map(item => item.price * item.quantity)
          .reduce((acc, cur) => acc + cur);

        return {
          ...state,
          totalPrice,
        };
      }

      cart.push(action.payload);
      totalPrice = cart
        .map(item => item.price * item.quantity)
        .reduce((acc, cur) => acc + cur);
      return { ...state, cart, totalAmount: totalAmount + 1, totalPrice };

    case cartActionType.DELETE_ITEM:
      const newCart = state.cart.filter(item => item._id !== action.payload);
      if (newCart.length === 0) {
        return { ...state, cart: [], totalAmount: 0, totalPrice: 0 };
      }

      const newTotalPrice = newCart
        .map(item => item.price * item.quantity)
        .reduce((acc, cur) => acc + cur);

      return {
        ...state,
        cart: newCart,
        totalAmount: state.totalAmount - 1,
        totalPrice: newTotalPrice,
      };

    case 'EMPTY_CART':
      return {
        cart: [],
        totalAmount: 0,
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
