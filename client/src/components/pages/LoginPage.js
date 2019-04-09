import React from "react";
import LoginForm from "../forms/LoginForm";
import { Link, withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

const LoginPage = () => (
  <div style={divStyle}>
    <h1
      style={{
        color: "#ffffff",
        marginBottom: "20px"
      }}
    >
      Start by Logging In
    </h1>

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

export default withRouter(LoginPage);
