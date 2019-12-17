import React, { Component } from 'react';
import { GooglePlacesAutoComplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    render() {
        return <GooglePlacesAutoComplete
            placeholder="Where to ?"
            placeHolderTextColor="#333"
            onPress={() => {}}
            query={{
                key: "AIzaSyDzIT-_ecrBGxzByiAUow5osX_T1S__G34",
                language: 'pt'
            }}
            textInputProps={{
                autoCapitalize: "none", // do not use uppercase
                autoCorret: false
            }}
            fetchDetails
            enablePoweredByContainer={false} // remove logo from footer
            />;
    }
}
