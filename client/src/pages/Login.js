import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Error from '../components/Error';
import LoadingSpinner from '../components/LoadingSpinner';
import { loginUser } from '../redux/user/user.action';
import {  notification } from 'antd';
import 'antd/dist/antd.css';

function Login() {
  const email = useRef(null);
  const pwd = useRef(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const { isLoading, isError, user, isSuccess } = useSelector(
    state => state.login
  );

  const submitHandler = e => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: pwd.current.value,
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                Login
              </h2>
              <i className='fa fa-user-plus' style={{ fontSize: '25px' }}></i>
            </div>
            {isError && <Error error={isError} />}
            {isLoading && <LoadingSpinner />}
            {isSuccess &&
              notification.success({
                message: 'Login successfully 🙌🙌🙌',
                duration: 2,
              })}
            <form onSubmit={e => submitHandler(e)}>
              <input
                className='form-control'
                type='email'
                placeholder='email'
                ref={email}
                required
                style={{ marginBottom: '10px' }}
              />
              <input
                className='form-control'
                type='password'
                placeholder='password'
                ref={pwd}
                minLength='8'
                required
              />

              <div style={{ textAlign: 'right' }}>
                <button className='btn btn-dark m-3' type='submit'>
                  Login
                </button>
              </div>
            </form>
          </div>
          <Link
            to='/signup'
            className='text-center mt-3'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Click here to register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
