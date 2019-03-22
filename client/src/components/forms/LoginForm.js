import React from 'react';
import { Form, Button } from 'semantic-ui-react';
class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  handleSubmit = async e => {
    console.log('handling submit')
    e.preventDefault();
    const { data } = this.state;
    const response = await fetch('http://localhost:8080/users/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post: data })
    }).then(res => res.json());
    this.setState({ responseToPost: response });
    console.log(response)
    //navigate to next page
    if(response != null){
      window.location.href = ''
    }
  };

  render() {
    const { data } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="pasword"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

export default LoginForm;
