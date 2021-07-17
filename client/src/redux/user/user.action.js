import axios from 'axios';
import { userActionType } from './user.type';

export const signNewUser = user => async dispatch => {
  dispatch({ type: userActionType.SIGNUP_REQUEST });

  try {
    const res = await axios.post('/api/users/signup', user);

    dispatch({ type: userActionType.SIGNUP_SUCCESS });
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
