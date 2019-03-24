import React from "react";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};


class Page extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }


  
  renderAccount(i){
    return (
    <div>
      temp
    </div>
    );
  }

  //gets all accounts of a given user_id
  fetchAccounts(user_id) = async e => {
    console.log('finding accounts under ', user_id);
    e.preventDefault();
    const { data } = this.state;
    const response = await fetch("http://localhost:8080/accounts/:user_id/", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: data })
    }).then(res => res.json());
    this.setState({ responseToPost: response });
    if (response.Success) {
      window.location.href = "/dashboard";
    }
    else{
      //wrong pw, try again, maybe include alert
      window.location.href = "/";
    }
    
  };

  
  //fetches account info from api, renders each account, where do we get user id from?
  render() {
    const user_id = '';
    const {accounts} = this.fetchAccounts(user_id);
    return(
      <div>
        {this.renderAccount(0)}
        {this.renderAccount(1)}
      </div>
    );
  }
}

class AccountPage extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <Page/>
      </div>
    );
  }
}

export default AccountPage;
