import { combineReducers } from 'redux';
import cartReducer from './cart/cart.reducer';
import {
  allProductReducer,
  singleProductReducer,
} from './products/product.reducer';

console.log(cartReducer);

const rootReducer = combineReducers({
  products: allProductReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
});

export default rootReducer;
