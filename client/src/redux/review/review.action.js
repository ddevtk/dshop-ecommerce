import axios from 'axios';
import { reviewActionType } from './review.type';

export const sendReview =
  (productId, reviewObj) => async (dispatch, getState) => {
    dispatch({ type: reviewActionType.ADD_REVIEW_REQUEST });
    try {
      const { user } = getState().login;
      await axios.post('/api/products/addReview', {
        review: reviewObj,
        productId: productId,
        user: user,
      });
      dispatch({ type: reviewActionType.ADD_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({ type: reviewActionType.ADD_REVIEW_ERROR });
    }
  };
