import orderActionType from './order.type';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  order: [],
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

    case orderActionType.GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case orderActionType.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        order: action.payload,
      };

    case orderActionType.GET_ORDER_BY_ID_ERROR:
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
