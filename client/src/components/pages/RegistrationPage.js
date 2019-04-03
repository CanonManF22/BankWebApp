import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class RegistrationPage extends React.Component {
  state = {
    data: {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      firstName: "",
      lastName: ""
    },
    loading: false,
    errors: {}
  };

  handleSubmit = async e => {
    const { data } = this.state;
    if (data.password === data.passwordConfirm) {
      e.preventDefault();
      const response = await fetch("http://localhost:8080/users/register", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ post: data })
      }).then(res => res.json());
      this.setState({ responseToPost: response });
    } else {
      window.alert("Passwords don't match!");
    }
  };

  //required to accept inputs into form
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  render() {
    const { data } = this.state;
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#ffffff" }}>Register a New Account</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="username" style={{ color: "#dfedf2" }}>
              Enter a Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="JohnDoe123"
              value={data.username}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password" style={{ color: "#dfedf2" }}>
              Enter a Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="SuperSecure123"
              value={data.password}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="passwordConfirm" style={{ color: "#dfedf2" }}>
              Confirm Your Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="SuperSecure123"
              value={data.passwordConfirm}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="firstName" style={{ color: "#dfedf2" }}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              value={data.firstName}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="lastName" style={{ color: "#dfedf2" }}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={data.lastName}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email" style={{ color: "#dfedf2" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="JohnDoe123@gmail.com"
              value={data.email}
              onChange={this.onChange}
            />
          </Form.Field>
          <Button primary style={{ margin: "5px" }}>
            Create Account
          </Button>
        </Form>
        <Link
          to="/"
          style={{
            color: "#ffffff",
            margin: "5px",
            textDecorationLine: "underline"
          }}
          >
            Have an account? Log In
        </Link>
      </div>
    );
  }
}

export default RegistrationPage;
