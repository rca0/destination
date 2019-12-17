import React, { Component } from 'react';
import { View } from 'react-native';

import MapView from 'react-native-maps';

import Search from './Search';

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
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

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }

    render() {
        const { region, destination } = this.state;

        return (
            <View stype={{ flex: 1 }}>
                <MapView
                    stype={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                >
                    {destination && (
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={() => {

                            }}
                        />
                    )}
                </ MapView>
                <Search onLocationSelected={this.handleLocationSelected} />
            </ View>

        )
    }
}
