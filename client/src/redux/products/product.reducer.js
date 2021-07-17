import { ProductActionType } from './product.type';

const initialAllProducts = {
  isLoading: false,
  isError: null,
  products: [],
};

const allProductReducer = (state = initialAllProducts, action) => {
  switch (action.type) {
    case ProductActionType.GET_ALL_PRODUCT_REQUEST:
      return { ...state, isLoading: true };

    case ProductActionType.GET_ALL_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, products: action.payload };

    case ProductActionType.GET_ALL_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: action.payload };

    default:
      return state;
  }
};
const initialSingleProducts = {
  isLoading: false,
  isError: null,
  product: [],
};

const singleProductReducer = (state = initialSingleProducts, action) => {
  switch (action.type) {
    case ProductActionType.GET_SINGLE_PRODUCT_REQUEST:
      return { ...state, isLoading: true };

    case ProductActionType.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, product: action.payload };

    case ProductActionType.GET_SINGLE_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: action.payload };

    default:
      return state;
  }
};

export { allProductReducer, singleProductReducer };
