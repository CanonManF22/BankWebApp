import React from "react";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      accounts: ["acc1", "acc2"]
    };
  }

  renderAccounts = () => {
    return (
      <ul>
        {this.state.accounts.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  };

  //gets all accounts of a given user_id
  fetchAccounts = async e => {
    //const {user_id} = this.state;
    //const user_id = 1;
    console.log("finding accounts under ", this.props.location.state.uID);
    //e.preventDefault();
    const { data } = this.state;
    console.log("DATA", data);
    const response = await fetch(`http://localhost:8080/accounts/:${this.state.user_id}/`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: data })
    }).then(res => res.json());
    this.setState({ responseToPost: response });
    if (response.length < 1) {
      console.log("no accounts for user");
    } else {
      console.log(response);
      return response;
    }
  };

  //fetches account info from api, renders each account, where do we get user id from?
  render() {
    //TODO, hardcoded with test user_id
    const resp = this.fetchAccounts;
    //console.log(this.fetchAccounts());
    return (
      <div>
        <h1 style={{ color: "#ffffff" }}>Placeholder [ATMs]</h1>
        {this.renderAccounts()}
      </div>
    );
  }

}

class AccountPage extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <button onClick={this.debug}>debug</button>
        <Page />
      </div>
    );
  }

  fetchAccounts = async e => {
    //const {user_id} = this.state;
    //const user_id = 1;
    console.log("finding accounts under ", this.props.location.state.uID);
    //e.preventDefault();
    // const { data } = this.state;
    // console.log("DATA", data);
    console.log(`http://localhost:8080/accounts/${this.props.location.state.uID}`)
    const data = ''
    const response = await fetch(`http://localhost:8080/accounts/${this.props.location.state.uID}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json());
    this.setState({ responseToPost: response });
    if (response.length < 1) {
      console.log("no accounts for user");
    } else {
      console.log(response);
      return response;
    }
  };

  debug = () => {
    console.log(this.props.location.state.uID);
    console.log(this.fetchAccounts())
  };
}

export default withRouter(AccountPage);
