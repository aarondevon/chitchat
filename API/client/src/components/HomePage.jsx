/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function HomePage(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push('chatPage');
          // window.location.reload();
        },
        (error) => {
          const resMessage = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString();

          setLoading(false);
          setMessage(resMessage);
        },
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div id="home-page-container" className="container">
      <div id="chat-page-header" className="row">
        <div className="col-6">
          <h1 id="hero-title" className="display-3">ChitChat</h1>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <small className="pr-2"> Don&apos;t have an account?</small>
          <Link to="/register" className="">Sign Up</Link>
        </div>
      </div>

      <div className="row">
        <div className="register-login-container mx-auto">
          <h2 className="display-4">Sign In</h2>
          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                <span className="spinner-border spinner-border-sm" />
                )}
                <span>Sign In</span>
              </button>
            </div>
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
