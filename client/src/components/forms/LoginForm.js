import React from 'react';
import { Form, Button } from "semantic-ui-react";

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
      }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    onChange = e => 
        this.setState({ 
            data: {...this.state.data, [e.target.name]: e.target.value }
        });
    
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/users/login', {
			mode: 'cors',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        console.log('Handle Submit called')
        const body = await response.text();
        this.setState({ responseToPost: body });
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