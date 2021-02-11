import React from 'react';

import { useGoogleMaps } from "react-hook-google-maps";

const GoogleMap = ({latt, long}) => {
    // console.log("(GoogleMap)========================== ", latt, long );
    let defaultCenter =  { lat: 17.45157364560896, lng: 78.56768994139004 };

    // if (latt && long ) {
    //     defaultCenter =  {lat: latt, lng: long };
    // }

    const { ref, map, google } = useGoogleMaps(
      // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
      "AIzaSyA-SvePR8DwM531CEbfJAipwszxCJwdvXk",
      // NOTE: even if you change options later
    //   { lat: 17.45157, lng: 78.5676 }
      // 17.45157364560896, 78.56768994139004
      {
        center: defaultCenter,
        zoom: 16
      }
    );
    // console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
    // console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
    if (map) {
      // execute when map object is ready
      var marker = new google.maps.Marker({ position: defaultCenter, map });
      marker.setTitle('Sri Laxmi Cars');
    }
  
    return <div ref={ref} style={{ width: 250, height: 200, border: "2px solid grey" }}/>;
  };
  
  export default GoogleMap;
