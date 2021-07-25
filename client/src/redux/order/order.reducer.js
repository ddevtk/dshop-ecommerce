import orderActionType from './order.type';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderActionType.PLACE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case orderActionType.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case orderActionType.PLACE_ORDER_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default orderReducer;
