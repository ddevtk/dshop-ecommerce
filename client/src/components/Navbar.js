import React from 'react';
import { FaBars } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/user/user.action';

export default function Navbar() {
  const { totalAmount } = useSelector(state => state.cart);

  const { user } = useSelector(state => state.login);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
          style={{
            color: 'white',
            fontSize: '30px',
            fontStyle: 'italic',
            fontFamily: 'Droid Sans',
          }}
        >
          D-SHOP
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <FaBars className='navbar-toggler-icon color-white' />
        </button>
        <div
          className='navbar-collapse collapse'
          id='navbarSupportedContent'
          style={{ justifyContent: 'flex-end' }}
        >
          <div className='d-flex justify-content-end'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                {user ? (
                  <div
                    className='dropdown'
                    style={{
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '30px',
                    }}
                  >
                    <button
                      style={{ color: 'white', marginLeft: '-10px' }}
                      className='btn dropdown-toggle'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <i
                        className='fa fa-user'
                        style={{ marginRight: '10px' }}
                      />
                      {user.name[0].toUpperCase() + user.name.slice(1)}
                    </button>
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton1'
                    >
                      <Link className='dropdown-item' to='/profile'>
                        Profile
                      </Link>
                      <Link className='dropdown-item' to='/order'>
                        Order
                      </Link>
                      <button className='dropdown-item' onClick={logout}>
                        Logout <i className='fas fa-sign-out-alt'></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    className='nav-link active'
                    style={{ fontSize: '20px' }}
                    aria-current='page'
                    to='/login'
                  >
                    Login
                  </Link>
                )}
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  style={{ fontSize: '20px' }}
                  to='/cart'
                >
                  <MdShoppingCart />
                  {totalAmount}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
