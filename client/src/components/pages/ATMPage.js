import React from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

export class MapContainer extends React.Component {
  render() {
    return (
      <Map style={divStyle} google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSbKUp1Xu9yP6FUwvjcj701S_NtR0N1Po"
})(MapContainer);
//"AIzaSyCh7Yb-Ie1DZz-xAPJONadWMajKfmZOJxo"
