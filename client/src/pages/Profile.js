import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeProfileState, updateProfile } from '../redux/user/user.action';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import { notification, Form, Input } from 'antd';
import 'antd/dist/antd.css';

const Profile = () => {
  const { user } = JSON.parse(localStorage.getItem('currentUser'));

  const { isLoading, isError, isSuccess } = useSelector(
    state => state.updateProfile
  );

  console.log(isError, isLoading, isSuccess);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeProfileState());
    };
  }, []);

  const updateProfileHandler = e => {
    e.preventDefault();
    const update = {
      name: name,
      email: email,
    };
    dispatch(updateProfile(update, user._id));
    setTimeout(() => {
      dispatch(removeProfileState());
    }, 1000);
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
                User Profile
              </h2>
              <i className='fa fa-user' style={{ fontSize: '25px' }}></i>
            </div>
            {isLoading && <LoadingSpinner />}
            {isError && <Error error='Email already registered' />}
            {isSuccess &&
              !isLoading &&
              notification.success({
                message: 'Update successfully 🙌🙌🙌',
                duration: 2,
              })}
            <form onSubmit={e => updateProfileHandler(e)}>
              <input
                className='form-control'
                type='text'
                minLength='4'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                className='form-control'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <div style={{ textAlign: 'right' }}>
                <button className='btn btn-dark m-3' type='submit'>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
