import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
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
      lastName: "",
      userType: "user"
    },
    loading: false,
    errors: {}
  };

  handleSubmit = async e => {
    const { data } = this.state;
    console.log(data);
    if (data.password === data.passwordConfirm && data.password.length > 5) {
      e.preventDefault();
      const response = await fetch("http://localhost:8080/users/register", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ post: data })
      }).then(res=>res.json());
      console.log('asdsdasd response', response)
      if (response.Success) window.alert("Registered!  Please Log In.");
      if (!response.Success){
        window.alert("Username exists, please choose another!");
        this.routeToRegistration();
      }
    } else {
      window.alert("Passwords don't match or are too short!");
      this.routeToLogin();
    }
  };

  routeToLogin = () => {
    this.props.history.push("/");
  };

  routeToRegistration = () => {
    this.props.history.push("/registration");
  };

  //required to accept inputs into form
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  //for user/manager
  handleChange = e => {
    const tempData = this.state.data;
    tempData.userType = e.target.value;
    this.setState({ tempData });
  };

  render() {
    const { data } = this.state;
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Register a New User Account</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="username" style={{ color: "#000000" }}>
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
            <label htmlFor="password" style={{ color: "#000000" }}>
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
            <label htmlFor="passwordConfirm" style={{ color: "#000000" }}>
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
            <label htmlFor="firstName" style={{ color: "#000000" }}>
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
            <label htmlFor="lastName" style={{ color: "#000000" }}>
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
            <label htmlFor="email" style={{ color: "#000000" }}>
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
          <Form.Field>
            <label htmlFor="userType" style={{ color: "#000000" }}>
              User Type
            </label>
            <select value={this.state.userType} onChange={this.handleChange}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </Form.Field>
          <Button primary style={{ margin: "5px" }}>
            Create Account
          </Button>
        </Form>
        <Link
          to="/"
          style={{
            color: "#000000",
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

export default withRouter(RegistrationPage);
