import { combineReducers } from 'redux';
import cartReducer from './cart/cart.reducer';
import { orderReducer, singleOrderReducer } from './order/order.reducer';

import {
  allProductReducer,
  singleProductReducer,
} from './products/product.reducer';

import reviewReducer from './review/review.reducer';

import {
  signupReducer,
  updateProfileReducer,
  loginReducer,
} from './user/user.reducer';

const rootReducer = combineReducers({
  products: allProductReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  signup: signupReducer,
  login: loginReducer,
  order: orderReducer,
  singleOrder: singleOrderReducer,
  review: reviewReducer,
  updateProfile: updateProfileReducer,
});

export default rootReducer;
