import React from "react";
import Button from "react-bootstrap/Button";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class TransferPage extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Initiate a Transfer</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />
        <Button
          onClick={this.routeChangeChaseTrans}
          variant="primary"
          size="lg"
          block
        >
          Transfers Between Chase Banks
        </Button>
        <Button
          onClick={this.routeChangeOtherTrans}
          variant="secondary"
          size="lg"
          block
        >
          Transfers Between Other Banks
        </Button>
      </div>
    );
  }

  routeChangeChaseTrans = () => {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/transferChase",
        state: { uID: this.props.location.state.uID }
      });
    }
  };

  routeChangeOtherTrans = () => {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/transferOther",
        state: { uID: this.props.location.state.uID }
      });
    }
  };
}

export default TransferPage;
