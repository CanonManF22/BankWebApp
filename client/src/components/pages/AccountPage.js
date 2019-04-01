import React from "react";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

//try to render a random button for now later: <h1>{props.accounts}</h1>
function Account(props) {
  console.log(JSON.stringify(props.value.accounts.accountID))
  return (
    <div>
      <h1>{'AccountID ' + props.value.accounts.accountID + ' ' + props.value.accounts.accType}</h1>
      <h3>{'Account Balance ' + props.value.accounts.accBalance}</h3>
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      accounts: this.fetchAccounts()
    };
    console.log('this is accounts', this.state.accounts)
  }
  
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
    this.setState({ accounts: response });
    if (response.length < 1) {
      window.alert(
        "No accounts for this user"
      );
    }
    else{
      this.state.accounts = response[0]
      this.props.history.push({accounts: response})
      // console.log('yo')
      // console.log(this.props.history)
      return response
    }
  };

  //create an account div for every account from fetch
  // display accType and accBalance
  renderAccounts = () => {
    return (
      <Account value = {this.state}/>
    );
  };

  render() {
    return (
      <div>
        <h1 style={{ color: "#ffffff" }}>Placeholder [ATMs]</h1>
        {this.renderAccounts()}
        
      </div>
    );
  }
}

export default withRouter(Page);
