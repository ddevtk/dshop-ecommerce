import { userActionType } from './user.type';

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

export const signupReducer = (state = signupState, action) => {
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

export const loginReducer = (state = loginState, action) => {
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
        user: action.payload,
      };

    case userActionType.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: 'invalid credentials',
      };

    case userActionType.LOGOUT_USER:
      return { ...state };

    case 'UPDATE_USER_STATE':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email,
        },
      };

    default:
      return state;
  }
};

export const updateProfileReducer = (state = signupState, action) => {
  switch (action.type) {
    case userActionType.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case userActionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case userActionType.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: 'Email already register',
      };

    case 'REMOVE_PROFILE_STATE':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: false,
      };

    default:
      return state;
  }
};
