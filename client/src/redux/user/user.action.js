import axios from 'axios';
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

export const loginUser = user => async (dispatch, getState) => {
  dispatch({ type: userActionType.LOGIN_REQUEST });

  try {
    const res = await axios.post('/api/users/login', user);

    dispatch({ type: userActionType.LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem('currentUser', JSON.stringify(getState().login));
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

export const updateProfile = (update, userId) => async (dispatch, getState) => {
  dispatch({ type: userActionType.UPDATE_PROFILE_REQUEST });

  try {
    await axios.post('/api/users/update-profile', {
      name: update.name,
      email: update.email,
      _id: userId,
    });

    dispatch({ type: userActionType.UPDATE_PROFILE_SUCCESS });
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        ...getState().login,
        user: {
          ...getState().login.user,
          name: update.name,
          email: update.email,
        },
      })
    );
    dispatch({ type: 'UPDATE_USER_STATE', payload: update });
  } catch (error) {
    dispatch({ type: userActionType.UPDATE_PROFILE_ERROR });
  }
};

export const removeProfileState = () => dispatch => {
  dispatch({ type: 'REMOVE_PROFILE_STATE' });
};
