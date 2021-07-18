const { userActionType } = require('./user.type');

const signupState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const loginState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  user: null,
};

const signupReducer = (state = signupState, action) => {
  switch (action.type) {
    case userActionType.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case userActionType.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
      };

    case userActionType.SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: 'Email already register',
      };
    default:
      return state;
  }
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case userActionType.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case userActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: null,
      };

    case userActionType.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: 'invalid credentials',
      };

    case userActionType.LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
};

module.exports = { signupReducer, loginReducer };
