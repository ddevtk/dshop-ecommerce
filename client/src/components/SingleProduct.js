import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import 'antd/dist/antd.css';
import { Rate } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleProduct,
  reloadSingleProduct,
} from '../redux/products/product.action';
import { addToCart } from '../redux/cart/cart.action';
import { formatPrice } from '../utils/formatPrice';
import { sendReview } from '../redux/review/review.action';

const SingleProduct = () => {
  const params = useParams();
  const history = useHistory();
  const { id } = params;

  const [value, setValue] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [isReview, setIsReview] = useState(false);

  console.log(isReview);

  const dispatch = useDispatch();

  const { isLoading, isError, product } = useSelector(
    state => state.singleProduct
  );

  const { user } = useSelector(state => state.login);

  const addToCartHandler = () => {
    dispatch(addToCart(quantity, product));
  };

  const addReview = () => {
    console.log('hello');
    console.log(product);

    if (product.reviews.length > 0) {
      product.reviews.forEach(item => {
        if (item.userId === user._id) {
          setIsReview(true);
          return;
        }
        const productId = product._id;
        const reviewObj = {
          rating: value,
          review: review,
        };
        dispatch(sendReview(productId, reviewObj));
        setIsReview(true);
      });
    } else {
      const productId = product._id;
      const reviewObj = {
        rating: value,
        review: review,
      };
      dispatch(sendReview(productId, reviewObj));
      setIsReview(true);
    }
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));

    return () => {
      setIsReview(false);
      dispatch(reloadSingleProduct());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !isLoading &&
      Object.keys(product).length > 0 &&
      product.reviews.forEach(item => {
        if (item.userId === user._id) {
          console.log(item.userId);
          console.log(user._id);
          console.log('hello 1');
          setIsReview(true);
          return;
        }
        setIsReview(false);
      });
  }, [product]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <div style={{ padding: '0 2rem' }}>
      {isLoading && (
        <div className='row justify-content-center'>
          <Loading type='spokes' color='#010133' />
        </div>
      )}
      {isError && (
        <div className='row justify-content-center'>
          <h2
            style={{
              display: 'inline-block',
              width: 'fit-content',
              color: 'red',
            }}
          >
            Could not find product with that ID
          </h2>
        </div>
      )}
      {!isLoading && !isError && (
        <div>
          <div className='row mt-5'>
            <div className='col-md-6'>
              <div className='card p-2 m-3 shadow p-3 mb-5 bg-white rounded'>
                <h1>{product.name}</h1>
                <hr />
                <img
                  src={product.image}
                  alt={product.name}
                  className='img-fluid m-3 big-img'
                />
                <p>{product.description}</p>
              </div>
            </div>
            <div className='col-md-6 text-left'>
              <div className='m-2 shadow p-3 mb-5 bg-white rounded'>
                <h1>{`Price: ${formatPrice(product.price)}`}</h1>
                <hr />
                <h1>Select quantity</h1>
                <select
                  value={quantity}
                  onChange={e => {
                    setQuantity(e.target.value);
                  }}
                >
                  {Array.from(
                    { length: product.countInStock },
                    (value, idx) => {
                      return (
                        <option key={idx + 1} value={idx + 1}>
                          {idx + 1}
                        </option>
                      );
                    }
                  )}
                </select>
                <hr />
                {product.countInStock === 0 ? (
                  <button type='button' className='btn btn-dark' disabled>
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    type='button'
                    className='btn btn-dark'
                    onClick={addToCartHandler}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>

              <div className='shadow p-3 mb-5 bg-white rounded ml-2 mr-3'>
                <h2>Give Your Review</h2>
                <Rate
                  style={{ fontSize: '20px' }}
                  allowHalf
                  defaultValue={value}
                  onChange={value => {
                    setValue(value);
                  }}
                />
                <input
                  type='text'
                  className='form-control mt-2'
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  name='review'
                />
                <button
                  type='button'
                  className={`${
                    !isReview
                      ? 'btn mt-3 btn-dark'
                      : 'btn mt-3 btn-dark btn-active'
                  }`}
                  onClick={addReview}
                >
                  Submit Review
                </button>
                <hr />
                <h1 className='mt-3'>Latest Reviews</h1>
                {product.reviews?.map((review, id) => {
                  const { rating, comment, name } = review;
                  return (
                    <div key={id}>
                      <Rate allowHalf defaultValue={rating} />
                      <p>{comment}</p>
                      <p>
                        By:{' '}
                        <b>{`${name.slice(0, 1).toUpperCase()}${name
                          .slice(1)
                          .toLowerCase()}`}</b>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SingleProduct;
