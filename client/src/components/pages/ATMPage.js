import React from "react";
import Geocode from "react-geocode";
import { Form, Button } from "react-bootstrap";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const divStyle = {
  height: "167vh",
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      address2: null,
      city: null,
      statename: null,
      zip: null,
      lat: null,
      long: null
    };
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDSbKUp1Xu9yP6FUwvjcj701S_NtR0N1Po");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
  }

  // Get latidude & longitude from address and set gmaps
  handleSubmit = () => {
    let tempAddr =
      this.state.address +
      "," +
      this.state.address2 +
      "," +
      this.state.city +
      "," +
      this.state.statename +
      "," +
      this.state.zip;
    let latLong = { lat: 0, long: 0 };
    Geocode.fromAddress(tempAddr).then(
      response => {
        let latLong = response.results[0].geometry.location;
        this.setState({ lat: latLong.lat, long: latLong.long });
        console.log(latLong);
      },
      error => {
        window.alert("Error: Couldn't find that address.");
        console.error(error);
      }
    );
    return latLong;
  };

  handleChangeAddr = e => {
    this.setState({ address: e.target.value });
  };

  handleChangeAddr2 = e => {
    this.setState({ address2: e.target.value });
  };

  handleChangeCity = e => {
    this.setState({ city: e.target.value });
  };

  handleChangeState = e => {
    this.setState({ statename: e.target.value });
  };

  handleChangeZip = e => {
    this.setState({ zip: e.target.value });
  };

  render() {
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Search for Chase ATMs</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />
        <Form.Group>
          <Form.Group>
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              type="text"
              value={this.state.address}
              placeholder={"1234 Main St"}
              onChange={this.handleChangeAddr}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              value={this.state.address2}
              placeholder={"Apartment, studio, or floor"}
              onChange={this.handleChangeAddr2}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group class={"col-md-6"}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={this.state.city}
                placeholder={"San Jose"}
                onChange={this.handleChangeCity}
              />
            </Form.Group>
            <Form.Group class={"col-md-4"}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={this.state.statename}
                placeholder={"CA"}
                onChange={this.handleChangeState}
              />
            </Form.Group>
            <Form.Group class={"col-md-2"}>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                value={this.state.zip}
                placeholder={"95192"}
                onChange={this.handleChangeZip}
              />
            </Form.Group>
            <Button
              style={{
                paddingRight: "30px",
                paddingLeft: "30px",
                marginTop: "29px",
                marginBottom: "21px"
              }}
              onClick={this.handleSubmit}
            >
              Search
            </Button>
          </Form.Row>
        </Form.Group>
        <Map
          style={{
            width: "900px",
            height: "900px"
          }}
          google={this.props.google}
          zoom={14}
        >
          <Marker onClick={this.onMarkerClick} name={"Current location"} />
          <InfoWindow onClose={this.onInfoWindowClose} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSbKUp1Xu9yP6FUwvjcj701S_NtR0N1Po"
})(MapContainer);
//"AIzaSyCh7Yb-Ie1DZz-xAPJONadWMajKfmZOJxo"
