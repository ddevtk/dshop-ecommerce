import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root.reducer';

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cart: [], totalAmount: 0, totalPrice: 0 };

const initialState = {
  cart: { ...cart },
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
