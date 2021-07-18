import React, { useEffect } from 'react';
import AllProducts from '../components/AllProducts';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/products/product.action';
import Error from '../components/Error';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='row justify-content-center'>
      {isLoading && <Loading type='spokes' color='#010133' />}
      {isError && <Error error='Some thing went wrong...' />}
      {!isLoading &&
        products.map(data => {
          return <AllProducts key={data._id} data={data} />;
        })}
    </div>
  );
};

export default Home;
