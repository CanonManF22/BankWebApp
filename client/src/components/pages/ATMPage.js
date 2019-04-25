import React from "react";
import Geocode from "react-geocode";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import { Map, GoogleApiWrapper } from "google-maps-react";

const divStyle = {
  position: "relative",
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
      address: "1 Washington Square",
      address2: null,
      city: "San Jose",
      statename: "CA",
      zip: "95192",
      lat: 37.335407,
      long: -121.881244
    };
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDSbKUp1Xu9yP6FUwvjcj701S_NtR0N1Po");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
  }

  componentDidMount() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = {
        center: { lat: this.state.lat, lng: this.state.long },
        zoom: 14
      };
      this.map = new maps.Map(node, mapConfig);
    } else {
      window.alert("Error, couldn't reach Google Maps.");
    }
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
    Geocode.fromAddress(tempAddr).then(
      response => {
        let latLong = response.results[0].geometry.location;
        this.setState({ lat: latLong.lat, long: latLong.long });

        const mapConfig = {
          center: latLong,
          zoom: 14
        };
        this.map = new maps.Map(node, mapConfig);

        console.log(latLong);
      },
      error => {
        window.alert("Error: Couldn't find that address.");
        console.error(error);
      }
    );

    // google is available
    const { google } = this.props;
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    /* working test coords
    const templat = 35.658072;
    const templng = 139.70164;

    const mapConfig = {
      center: {
        lat: parseFloat(templat),
        lng: parseFloat(templng)
      },
      zoom: 14
    };
    this.map = new maps.Map(node, mapConfig);
    */
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
              placeholder={"1 Washington Square"}
              onChange={this.handleChangeAddr}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              placeholder={"Apartment, studio, or floor"}
              onChange={this.handleChangeAddr2}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group className={"col-md-4"}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder={"San Jose"}
                onChange={this.handleChangeCity}
              />
            </Form.Group>
            <Form.Group className={"col-md-2"}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder={"CA"}
                onChange={this.handleChangeState}
              />
            </Form.Group>
            <Form.Group className={"col-md-2"}>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
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
        <Map ref={"map"} google={this.props.google} zoom={14} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSbKUp1Xu9yP6FUwvjcj701S_NtR0N1Po"
})(MapContainer);
//"AIzaSyCh7Yb-Ie1DZz-xAPJONadWMajKfmZOJxo"
