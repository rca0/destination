import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {
    Container,
    TypeTitle,
    TypeDescription,
    TypeImage,
    RequestButtom,
    RequestButtomText
} from './styles'

import uberx from '../../assets/uberx.png'

export default class index extends Component {
    render() {
        return (
            <Container>
                <TypeTitle>Popular</TypeTitle>
                <TypeDescription>Xyz</TypeDescription>
                <TypeImage source={uberx} />
                <TypeTitle>UberX</TypeTitle>
                <TypeDescription>$12,00</TypeDescription>

                <RequestButtom onPress={() => {}}>
                    <RequestButtomText>Get UberX</RequestButtomText>
                </RequestButtom>
            </Container>
        )
    }
}
