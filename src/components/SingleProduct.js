import { useParams } from 'react-router-dom';
import { productsData } from '../productsData';
import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';

const SingleProduct = () => {
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(4);

  const product = productsData.find(data => data.id === id * 1);

  return (
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
              {Array.from({ length: product.countInStock }, (value, idx) => {
                return (
                  <option key={idx + 1} value={idx + 1}>
                    {idx + 1}
                  </option>
                );
              })}
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
            <input type='text' className='form-control mt-2' name='review' />
            <button type='button' className='btn mt-3 btn-dark'>
              Submit Review
            </button>
            <h1 className='mt-3'>Latest Reviews</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
