import { combineReducers } from 'redux';
import {
  allProductReducer,
  singleProductReducer,
} from './products/product.reducer';

const rootReducer = combineReducers({
  products: allProductReducer,
  singleProduct: singleProductReducer,
});

export default rootReducer;
