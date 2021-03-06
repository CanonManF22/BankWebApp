import React from "react";
import Geocode from "react-geocode";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import { GoogleApiWrapper, InfoWindow } from "google-maps-react";

const divStyle = {
  position: "relative",
  height: "2200px",
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
    Geocode.setApiKey("AIzaSyCvilfCSc7PaEWWpRPNbpalhQ7XGRt18gM");
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
      //this.infowindow = new maps.InfoWindow();
      //this.infowindow.setContent({});
    } else {
      window.alert("Error, couldn't reach Google Maps.");
    }
  }

  // Get latidude & longitude from address and set gmaps
  handleSubmit = () => {
    // google is available
    const { google } = this.props;
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    let tempAddr =
      this.state.address +
      " " +
      this.state.address2 +
      ", " +
      this.state.city +
      "," +
      this.state.statename +
      " " +
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

        //nearby search for chase
        const request = {
          location: latLong,
          radius: "10000",
          name: "Chase",
          type: ["atm"]
        };

        const service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, this.callback);

        console.log(latLong);
      },
      error => {
        window.alert("Error: Couldn't find that address.");
        console.error(error);
      }
    );
  };

  //function to process search results
  callback = (results, status) => {
    const { google } = this.props;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        //var place = results[i];
        console.log(results[i]);
        this.createMarker(results[i]);
      }
    }
  };

  //creates markers on the map
  createMarker = place => {
    const { google } = this.props;

    let infowindow = null;

    Geocode.fromLatLng(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    ).then(
      response => {
        const address = response.results[0].formatted_address;
        infowindow = new google.maps.InfoWindow({
          content: place.name + " " + address
        });
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    marker.addListener("click", function() {
      infowindow.open(this.map, marker);
    });

    /* clicking doesnt work atm
    google.maps.event.addListener(marker, "click", () => {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map, this);
    }); */
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
        <div
          className="map"
          ref={"map"}
          google={this.props.google}
          zoom={14}
          style={{ width: "100%", height: "85%" }}
        >
          <InfoWindow ref={"infowindow"} />
          {/*<InfoWindow ref={"infowindow"} onClose={this.onInfoWindowClose} >*/}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCvilfCSc7PaEWWpRPNbpalhQ7XGRt18gM"
})(MapContainer);
//"AIzaSyCh7Yb-Ie1DZz-xAPJONadWMajKfmZOJxo"
