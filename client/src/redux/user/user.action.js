import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { userActionType } from './user.type';

export const signNewUser = user => async dispatch => {
  dispatch({ type: userActionType.SIGNUP_REQUEST });

  try {
    const res = await axios.post('/api/users/signup', user);

    dispatch({ type: userActionType.SIGNUP_SUCCESS });

    window.location.href = '/login';
  } catch (error) {
    dispatch({ type: userActionType.SIGNUP_ERROR });
  }
};

export const loginUser = user => async dispatch => {
  dispatch({ type: userActionType.LOGIN_REQUEST });

  try {
    const res = await axios.post('/api/users/login', user);

    dispatch({ type: userActionType.LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem('currentUser', JSON.stringify(res.data));

    window.location.href = '/';
  } catch (error) {
    console.log(error);
    dispatch({ type: userActionType.LOGIN_ERROR });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('cart');
  localStorage.removeItem('currentUser');

  dispatch({ type: userActionType.LOGOUT_USER });

  window.location.href = '/';
};
