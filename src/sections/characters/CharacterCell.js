import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from 'maheroes/src/commons'

export default class CharacterCell extends Component {

    static defaultProps = {
        item: {},
        onSelect: () => {}
    }

    render() {

        const { item, onSelect } = this.props
        const name = item.name ? item.name : ''

        const heroeImagePath = item.thumbnail ? item.thumbnail.path + '/landscape_large' : null
        const heroeImageType = item.thumbnail ? item.thumbnail.extension : null
        const heroeImageComp = heroeImagePath ? heroeImagePath + '.' + heroeImageType : null

        // Placeholder is not necessary, because API provides one
        const heroeImage = heroeImageComp ?
            { uri: heroeImageComp } : require('maheroes/src/resources/no_image.png')
        
        return (
            <TouchableOpacity onPress={ () => onSelect(item) }>
                <Image source={ heroeImage } resizeMode={ 'cover' } style={ styles.image }/>
                <View style={ styles.textContainer }>
                    <Text style={ styles.name }>{ name }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.textCell
    },
    name: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent'
    },
})