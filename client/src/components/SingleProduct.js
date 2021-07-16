import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../redux/products/product.action';
import { Fragment } from 'react';

const SingleProduct = () => {
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const [value, setValue] = useState(4);

  const dispatch = useDispatch();
  const { isLoading, isError, product } = useSelector(
    state => state.singleProduct
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [isError]);

  return (
    <Fragment>
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
                <h1>Price: {product.price}</h1>
                <hr />
                <h1>Select quantity</h1>
                <select>
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
                <button type='button' className='btn btn-dark'>
                  ADD TO CART
                </button>
              </div>
              <hr />
              <div className='shadow p-3 mb-5 bg-white rounded ml-2 mr-3'>
                <h2>Give Your Review</h2>
                <Rating
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  precision={0.5}
                />
                <input
                  type='text'
                  className='form-control mt-2'
                  name='review'
                />
                <button type='button' className='btn mt-3 btn-dark'>
                  Submit Review
                </button>
                <h1 className='mt-3'>Latest Reviews</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default SingleProduct;
