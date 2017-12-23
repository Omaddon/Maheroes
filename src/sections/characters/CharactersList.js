import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from 'maheroes/src/commons'

import CharacterCell from './CharacterCell'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'maheroes/src/redux/actions/characters'
/*******************************************************/

class CharactersList extends Component {

    componentWillMount() {
        this.props.fetchCharactersList()
    }

    onSelect(character) {
        this.props.updateCharacterSelected(character)
    }

    renderItem(item, index) {
        return (
            <CharacterCell 
                item        = { item } 
                onSelect    = { (character) => { this.onSelect(character) } }
            />
        )
    }

    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data                = { this.props.list }
                    renderItem          = { ({item, index}) => this.renderItem(item, index) }
                    keyExtractor        = { (item, index) => index }
                    extraData           = { this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list:       state.characters.list,
        isFetching: state.characters.isFetching,
        selected:   state.characters.selected
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersAction.fetchCharactersList())
        },
        updateCharacterSelected: (character) => {
            dispatch(CharactersAction.updateCharacterSelected(character))
            Actions.CharacterDetail({ title: character.name })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }
})