import React from "react";
import { withRouter } from "react-router-dom";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};
 
export class MapContainer extends React.Component {
  render() {
    return (
        <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCh7Yb-Ie1DZz-xAPJONadWMajKfmZOJxo'
})(MapContainer)


