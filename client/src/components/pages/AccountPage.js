import React from "react";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class Page extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user_id: null,
  //     accounts: ["acc1", "acc2"]
  //   };
  // }
  
  fetchAccounts = async e => {
    const user_id = this.props.location.state.uID;
    console.log(`http://localhost:8080/accounts/${user_id}`)
    const data = ''
    const response = await fetch(`http://localhost:8080/accounts/${user_id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json());
    this.setState({ responseToPost: response });
    if (response.length < 1) {
      console.log("no accounts for user");
    }
    else{
      window.alert(
        "The Username or Password you entered does not match our records."
      );
    }
  };

  //create an account div for every account from fetch
  renderAccounts = () => {
    const accounts = this.fetchAccounts()
    return(
      <h1>{accounts.map(account => (
        <li key={account}>{account}</li>
      ))}</h1>
    )
  };

  render() {
    return (
      <div>
        <h1 style={{ color: "#ffffff" }}>Placeholder [ATMs]</h1>
        <h1>{this.renderAccounts()}</h1>
      </div>
    );
  }
}

export default withRouter(Page);
