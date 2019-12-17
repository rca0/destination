import React, { Component } from 'react';
import { View } from 'react-native';

import MapView from 'react-native-maps';

export default class Map extends Component {
    state = {
        region: null
    };

    // render component in screen
    async componentDidMount() {
        // callback situation
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
                    }
                 });
            }, // success
            () => {}, // error
            {
                timeout: 2000,
                enableHighAccuracy: true, // ways to get geolocation (1st wifi after gps)
                maximumAge: 1000, // cache location
            } // user positon
        )
    }

    render() {
        const { region } = this.state;

        return (
            <View stype={{ flex: 1 }}>
                <MapView
                    stype={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled />
            </ View>
        )
    }
}
