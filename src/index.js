import React from 'react';
import MapView from 'react-native-maps';

import { View } from 'react-native';

const App = () => (
    <View stype={{ flex: 1 }}>
        <MapView
            stype={{ flex: 1 }}
            region={{
                latitude: -26.265518,
                longitude: -48.877581,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.034,
            }}
            showsUserLocation
            loadingEnabled
        />
    </ View>
);

export default App;
