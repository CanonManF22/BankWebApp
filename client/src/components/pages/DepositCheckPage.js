import React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import request from "superagent";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

const dropStyle = {
  height: "150px",
  width: "400px",
  backgroundColor: "#ffffff",
  border: "2px dashed rgb(187, 186, 186)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontSize: "16px"
};

const imgStyle = {
  maxWidth: "300px"
};

const CLOUDINARY_UPLOAD_PRESET = "xridflgz";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/cs160bank/upload";

class DepositCheckPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uID: null,
      option1: null,
      depositAmt: 0,
      uploadedFileCloudinaryUrl: ""
    };
  }

  componentDidMount() {
    this.fetchAccounts().then(res =>
      res
        ? this.setState({
            accounts: res,
            option1:
              this.state.accounts[0].accType +
              " - " +
              this.state.accounts[0].accountID +
              " - " +
              "$" +
              parseFloat(
                Math.round(this.state.accounts[0].accBalance * 100) / 100
              ).toFixed(2)
          })
        : this.setState({ accounts: res, option1: null })
    );
  }

  fetchAccounts = async e => {
    //not logged in check to prevent fatal crash
    if (this.props.location.state === undefined) {
      window.alert(
        "Error: Not Logged In.  this.props.location.state is undefined."
      );
      this.setState({
        uID: -1,
        accounts: [{ accType: "null", accountID: -1, accBalance: -1 }]
      });
      return { uID: -1 };
    }

    const user_id = this.props.location.state.uID;
    console.log(`http://localhost:8080/accounts/${user_id}`);

    const response = await fetch(`http://localhost:8080/accounts/${user_id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
    console.log(response);
    this.setState({ accounts: response, uID: this.props.location.state.uID });
    if (response.length < 1) {
      window.alert("No accounts for this user");
    } else {
      return response;
    }
  };

  handleChange1 = e => {
    this.setState({
      option1: e.target.value
    });
  };

  handleChangeNums = e => {
    this.setState({ depositAmt: e.target.value });
  };

  handleSubmit = async e => {
    const uID = this.props.location.state.uID;
    if (this.state.depositAmt <= 0)
      window.alert("Error: Invalid deposit amount.");
    else {
      console.log("make request");
      const response = await fetch(
        `http://localhost:8080/accounts/${uID}/deposit`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state)
        }
      ).then(res => res.json());
      if (response.Success) {
        window.alert("Deposit Successful.");
        this.props.history.push({
          pathname: "/accounts",
          state: { uID: uID } //,manager
        });
      } else {
        window.alert("Error during deposit.");
      }
    }
  };

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    let fetched = this.state.accounts;
    if (fetched === undefined) fetched = [];
    return fetched.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Deposit a Check</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />

        <div>
          <div className="FileUpload" style={dropStyle}>
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              accept="image/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      <p>
                        Drop an image or click to select an image to upload.
                      </p>
                    }
                  </div>
                );
              }}
            </Dropzone>
          </div>

          <div>
            {this.state.uploadedFileCloudinaryUrl === "" ? null : (
              <div>
                <p>Image Uploaded: {this.state.uploadedFile.name}</p>
                <img
                  style={imgStyle}
                  alt="check"
                  src={this.state.uploadedFileCloudinaryUrl}
                />
              </div>
            )}
          </div>
        </div>
        <br />
        <Form.Group>
          <Form.Label style={{ fontSize: "150%" }}>Amount ($USD)</Form.Label>
          <Form.Control
            type="number"
            value={this.state.depositAmt}
            onChange={this.handleChangeNums}
          />
          <Form.Label style={{ fontSize: "150%" }}>Deposit To</Form.Label>
          <Form.Control as="select" onChange={this.handleChange1}>
            {this.state.accounts.map(acc => (
              <option>
                {acc.accType +
                  " - " +
                  acc.accountID +
                  " - " +
                  "$" +
                  parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(2)}
              </option>
            ))}
          </Form.Control>
          <Button onClick={this.handleSubmit} style={{ marginTop: "10px" }}>
            Deposit Check
          </Button>
        </Form.Group>
      </div>
    ) : (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>No accounts for this user.</h1>
      </div>
    );
  }
}

export default withRouter(DepositCheckPage);
