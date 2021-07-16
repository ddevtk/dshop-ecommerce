import React from 'react';
import { FaBars } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
          className='collapse navbar-collapse'
          style={{ justifyContent: 'flex-end' }}
          id='navbarSupportedContent'
        >
          <div className='d-flex justify-content-end'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  style={{ fontSize: '20px' }}
                  aria-current='page'
                  to='/login'
                >
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  style={{ fontSize: '20px' }}
                  to='/cart'
                >
                  <MdShoppingCart />0
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
