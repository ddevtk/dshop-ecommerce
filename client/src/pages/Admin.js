import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import UserList from '../components/UserList';
import ProductList from '../components/ProductList';
import AddProduct from '../components/AddProduct';
import OrderList from '../components/OrderList';

const Admin = () => {
  return (
    <BrowserRouter>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-10'>
          <ul className='admin p-2' style={{ backgroundColor: '#F5F5F5' }}>
            <li>
              <Link to='/admin/user-list'>User list</Link>
            </li>
            <li>
              <Link to='/admin/product-list'>Product list</Link>
            </li>
            <li>
              <Link to='/admin/addProduct'>Add new product</Link>
            </li>
            <li>
              <Link to='/admin/order-list'>Order list</Link>
            </li>
          </ul>
          <Switch>
            <Route path='/admin/user-list' component={UserList} />
            <Route path='/admin/product-list' component={ProductList} />
            <Route path='/admin/addProduct' component={AddProduct} />
            <Route path='/admin/order-list' component={OrderList} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Admin;
