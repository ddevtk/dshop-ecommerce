import axios from 'axios';

import { ProductActionType } from './product.type';

export const getAllProducts = () => async dispatch => {
  dispatch({ type: ProductActionType.GET_ALL_PRODUCT_REQUEST });

  try {
    const res = await axios('/api/products');
    dispatch({
      type: ProductActionType.GET_ALL_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: ProductActionType.GET_ALL_PRODUCT_ERROR, payload: error });
  }
};

export const getSingleProduct = productId => async dispatch => {
  dispatch({ type: ProductActionType.GET_SINGLE_PRODUCT_REQUEST });

  try {
    const res = await axios.get(`/api/products/${productId}`);
    console.log(res);

    dispatch({
      type: ProductActionType.GET_SINGLE_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ProductActionType.GET_SINGLE_PRODUCT_ERROR,
      payload: error,
    });
  }
};
