import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from 'maheroes/src/commons'

export default class CharacterOptions extends Component {

    render() {
        return (
            <View style={ styles.container }>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    }
})