import React from "react";
import LoginForm from "../forms/LoginForm";
import { Link } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

const LoginPage = () => (
  <div style={divStyle}>
    

    <LoginForm />

    <Link
      to="/registration"
      style={{
        color: "#ffffff",
        margin: "5px",
        textDecorationLine: "underline"
      }}
    >
      Don't have an account? Sign Up
    </Link>
  </div>
);

export default LoginPage;
