import React from 'react';
import LoginForm from '../forms/LoginForm';
import { Link } from "react-router-dom";

const LoginPage = () => (
  <div>
    <h1>Login Page</h1>

    <LoginForm />

    <Link to="/registration">Not a user?  Register Here.</Link>
  </div>
);

export default LoginPage;
