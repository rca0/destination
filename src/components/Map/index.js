import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { getPixelSize } from '../../utils';

import Search from './Search';

import markerImage from '../../assets/Marker';

import { LocationBox, LocationText } from './styles';

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
                    ref={el => this.mapView = el}
                >
                    {destination && (
                        <Fragment>
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    this.mapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: getPixelSize(50),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                            bottom: getPixelSize(50),
                                        }
                                    });
                                }}
                            />
                            <Marker
                                coordinate={destination}
                                anchor={{ x: 0, y: 0 }}
                                image={markerImage}
                            >
                                <LocationBox>
                                    <LocationText>{destination.title}</LocationText>
                                </LocationBox>
                            </Marker>
                        </Fragment>
                    )}
                </ MapView>
                <Search onLocationSelected={this.handleLocationSelected} />
            </ View>

        )
    }
}
