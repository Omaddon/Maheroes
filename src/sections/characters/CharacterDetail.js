import React, { Component } from 'react'
import { View, ScrollView, Image, Text, StyleSheet, Linking } from 'react-native'
import { Colors, HeroeInfo } from 'maheroes/src/commons'
import { Button } from 'maheroes/src/widgets'
import { Actions } from 'react-native-router-flux'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'maheroes/src/redux/actions/characters'
/*******************************************************/

class CharacterDetail extends Component {

    goToUrl(url) {
        if (url) {
            Linking.openURL(url)
        }
    }

    render() {

        const { item } = this.props
        const name = item.name ? item.name : ''
        const description  = item.description ? item.description : 'No description available.'
        const wiki = HeroeInfo.getUrl(item, 'wiki')
        const detail = HeroeInfo.getUrl(item, 'detail')
        
        return(
            <ScrollView style={ styles.container }>
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
                <View style={ styles.buttonContainer }>
                    { wiki ?
                        <Button
                            label='Wiki'
                            containerStyle={ styles.button }
                            onPress= { () => { this.goToUrl(wiki) } }
                        />
                    : null }
                    { detail ?
                        <Button
                            label='Detail'
                            containerStyle={ styles.button }
                            onPress= { () => { this.goToUrl(detail) } }
                        />
                    : null }
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.characters.selected
    }
}

export default connect(mapStateToProps)(CharacterDetail)

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
    },
    buttonContainer: {
        flexDirection: 'row',
        margin: 20
    },
    button: {
        flex: 1,
        margin: 10
    }
})