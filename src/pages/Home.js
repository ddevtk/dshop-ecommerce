import React from 'react';
import AllProducts from '../components/AllProducts';
import { productsData } from '../productsData';

const Home = () => {
  return (
    <div className='row justify-content-center'>
      {productsData.map(data => {
        return <AllProducts key={data.id} data={data} />;
      })}
    </div>
  );
};

export default Home;
