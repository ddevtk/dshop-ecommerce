import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const AllProducts = ({ data }) => {
  const { image, name, price, _id, rating } = data;
  let value = 0;
  let precision = 0;
  if (rating % Math.floor(rating) === 0.5) {
    value = rating;
    precision = 0.5;
  }
  if (rating % Math.floor(rating) !== 0.5) {
    value = rating;
    precision = 1;
  }

  return (
    <div className='col-md-3 m-2 p-2 shadow p-3 mb-5 bg-white rounded card'>
      <div className='text-left'>
        <div>
          <Link
            to={`/products/${_id}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <div className='text-center'>
              <img src={image} alt={name} className='img-fluid' />
            </div>
            <h1>{name}</h1>
            <Box component='fieldset' mb={3} borderColor='transparent'>
              <Rating
                name='customized-empty'
                defaultValue={value}
                precision={precision}
                readOnly
              />
            </Box>
            <h1>Price: {price} VND</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
