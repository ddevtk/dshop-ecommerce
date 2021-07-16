import React, { useEffect } from 'react';
import AllProducts from '../components/AllProducts';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/products/product.action';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className='row justify-content-center'>
      {isLoading && <Loading type='spokes' color='#010133' />}
      {isError && <h1>Some thing went wrong</h1>}
      {!isLoading &&
        products.map(data => {
          return <AllProducts key={data._id} data={data} />;
        })}
    </div>
  );
};

export default Home;
