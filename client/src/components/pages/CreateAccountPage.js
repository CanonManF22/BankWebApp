import React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class CreateAccountPage extends React.Component {
  state = {
    bankType: "Checking"
  };

  //save selected bank type to state upon change
  handleChange = e => {
    this.setState({ bankType: e.target.value });
  };

  //send api to create account
  handleSubmit = async e => {
    console.log(this.state);
    //add api call here to create account
    const uID = this.props.location.state.uID;
    const { data } = this.state;
    const response = await fetch(`http://localhost:8080/accounts/${uID}/open`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
<<<<<<< HEAD
    console.log('response', response)
=======
    console.log(response);
    /* untested front end response
    if (response.Success) { //
      window.alert("Successfully created account!");
      this.props.history.push({
        pathname: "/accounts",
        state: { uID: uID } //,manager
      });
    } else {
      window.alert("Error creating account");
    } */
>>>>>>> c2caacce3a11bcf69873048696817ee663cc94e7
  };

  render() {
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Create a New Bank Account</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />

        <Form.Group>
          <Form.Label style={{ fontSize: "150%" }}>Bank Type</Form.Label>
          <Form.Control as="select" onChange={this.handleChange}>
            <option value="Checking">Checking</option>
            <option value="Saving">Saving</option>
          </Form.Control>
          <Button
            onClick={this.handleSubmit}
            primary
            style={{ marginTop: "5px" }}
          >
            Create Account
          </Button>
        </Form.Group>
      </div>
    );
  }
}

export default withRouter(CreateAccountPage);
