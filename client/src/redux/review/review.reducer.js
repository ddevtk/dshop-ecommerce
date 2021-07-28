import { reviewActionType } from './review.type';

const initialState = {
  isLoading: false,
  isSuccess: false,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case reviewActionType.ADD_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case reviewActionType.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case reviewActionType.ADD_REVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    default:
      return state;
  }
};

export default reviewReducer;
