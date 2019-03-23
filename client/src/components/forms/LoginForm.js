import React from "react";
import { Form, Button } from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  handleSubmit = async e => {
    console.log("handling submit");
    e.preventDefault();
    const { data } = this.state;
    const response = await fetch("http://localhost:8080/users/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: data })
    }).then(res => res.json());
    this.setState({ responseToPost: response });
    if (response.Success) {
      window.location.href = "/DashboardPage";
    }
    else{
      //wrong pw, try again
      window.location.href = "/";
    }
    
  };

  render() {
    const { data } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="password"
            id="pasword"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary style={{ margin: "5px" }}>
          Sign In
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
