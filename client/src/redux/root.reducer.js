import { combineReducers } from 'redux';
import cartReducer from './cart/cart.reducer';
import {
  allProductReducer,
  singleProductReducer,
} from './products/product.reducer';
import { signupReducer, loginReducer } from './user/user.reducer';

const rootReducer = combineReducers({
  products: allProductReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  signup: signupReducer,
  login: loginReducer,
});

export default rootReducer;
