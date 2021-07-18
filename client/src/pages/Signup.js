import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import LoadingSpinner from '../components/LoadingSpinner';
import { signNewUser } from '../redux/user/user.action';

function Signup() {
  const name = useRef(null);
  const email = useRef(null);
  const pwd = useRef(null);
  const cPwd = useRef(null);

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(state => state.signup);

  const submitHandler = e => {
    e.preventDefault();
    const user = {
      name: name.current.value,
      email: email.current.value,
      password: pwd.current.value,
    };
    if (pwd.current.value === cPwd.current.value) {
      console.log('hello');
      dispatch(signNewUser(user));
    }
  };

  return (
    <div>
      <div className='row justify-content-center m-3'>
        <div
          className='col-md-5 card p-3 shadow p-3 mb-5 bg-white rounded'
          style={{ marginTop: '100px' }}
        >
          <div className='div'>
            <div className='text-center m-3'>
              <h2 className='m-3' style={{ display: 'inline' }}>
                Sign up
              </h2>
              <i className='fa fa-user-plus' style={{ fontSize: '25px' }}></i>
            </div>
            {isError && <Error error={isError} />}
            {isLoading && <LoadingSpinner />}
            <form onSubmit={e => submitHandler(e)}>
              <input
                className='form-control'
                type='text'
                placeholder='name'
                ref={name}
                required
              />
              <input
                className='form-control'
                type='email'
                placeholder='email'
                ref={email}
                required
              />
              <input
                className='form-control'
                type='password'
                placeholder='password'
                ref={pwd}
                minLength='8'
                required
              />
              <input
                className='form-control'
                type='password'
                placeholder='confirm password'
                ref={cPwd}
                minLength='8'
                required
              />
              <div style={{ textAlign: 'right' }}>
                <button className='btn btn-dark m-3' type='submit'>
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <Link
            to='/login'
            className='text-center mt-3'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Click here to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
