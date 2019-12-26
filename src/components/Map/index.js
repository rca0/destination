import React, { Component, Fragment } from 'react';
import { View, Image } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import { getPixelSize } from '../../utils';

import Search from '../Search';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTextSmall
} from './styles';

Geocoder.init('AIzaSyDzIT-_ecrBGxzByiAUow5osX_T1S__G34');

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        duration: null,
        location: null,
    };

    // render component in screen
    async componentDidMount() {
        // callback situation
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                // get current location with geocoding package
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                this.setState({
                    location,
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

    handleBack = () => {
        this.setState({ destination: null });
    };

    render() {
        const { region, destination, duration, location } = this.state;

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
                                // result of api map google
                                onReady={result => {
                                    this.setState({ duration: Math.floor(result.duration) })
                                    this.mapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: getPixelSize(50),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                            bottom: getPixelSize(350),
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

                            <Marker
                                coordinate={region}
                                anchor={{ x: 0, y: 0 }}
                            >
                                <LocationBox>
                                    <LocationTimeBox>
                                        <LocationText>{duration}</LocationText>
                                        <LocationTextSmall>MIN</LocationTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>{location}</LocationText>
                                </LocationBox>
                            </Marker>
                        </Fragment>
                    )}
                </ MapView>
                    { destination ? (
                        <frameElement>
                            <Back onPress={this.handleBack}>
                                <Image source={backImage} />
                            </Back>
                            <Details />
                        </frameElement>
                    ) : (
                        <Search onLocationSelected={this.handleLocationSelected} />
                     )}
            </ View>

        )
    }
}
