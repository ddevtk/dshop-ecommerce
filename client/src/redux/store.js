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

const login = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : {};

const initialState = {
  cart: { ...cart },
  login: { ...login },
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
