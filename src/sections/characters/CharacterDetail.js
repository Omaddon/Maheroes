import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Colors, HeroeInfo } from 'maheroes/src/commons'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'maheroes/src/redux/actions/characters'
/*******************************************************/

class CharacterDetail extends Component {

    render() {

        const { item } = this.props
        const name = item.name ? item.name : ''
        const description  = item.description ? item.description : null

        return(
            <View style={ styles.container }>
                <Image 
                    source={ HeroeInfo.getHeroeImage(item) } 
                    resizeMode={ 'cover' } 
                    style={ styles.image }
                />
                <View style={ styles.textContainer }>
                    <Text style={ styles.name }>{ name }</Text>
                    <Text style={ styles.description }>{ description }</Text>
                </View>
                <View style={ styles.textContainer }>
                    <Text style={ styles.comicsTitle }>
                        { item.comics.available > 0 ? 'Comics:' : null }
                    </Text>
                    <Text style={ styles.comics}>{ HeroeInfo.getHeroeComics(item) }</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.characters.selected
    }
}

export default connect(mapStateToProps, null)(CharacterDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    image: {
        width: '100%',
        height: 200
    },
    textContainer: {
        
        alignItems: 'stretch',
        padding: 20
    },
    name: {
        
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    description: {
        
        top: 20,
        fontSize: 18,
        color: 'white'
    },
    comicsTitle: {
        
        top: 10,
        fontSize: 20,
        color: 'white'
    },
    comics: {
        
        top: 20,
        fontSize: 14,
        color: 'green'
    }
})