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

export const filterProduct =
  ({ sort, category, search }) =>
  async dispatch => {
    dispatch({ type: ProductActionType.GET_ALL_PRODUCT_REQUEST });
    try {
      const res = await axios('/api/products');
      let data = res.data;

      if (search) {
        data = data.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sort === 'lth') {
        data = data.sort((a, b) => a.price - b.price);
      }
      if (sort === 'htl') {
        data = data.sort((b, a) => a.price - b.price);
      }
      if (sort === 'az') {
        data = data.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === 'za') {
        data = data.sort((b, a) => a.name.localeCompare(b.name));
      }

      if (category !== '-- Select category --') {
        if (category !== 'all') {
          data = data.filter(item => item.category === category);
        }
      }

      dispatch({
        type: ProductActionType.GET_ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductActionType.GET_ALL_PRODUCT_ERROR,
        payload: error,
      });
    }
  };
