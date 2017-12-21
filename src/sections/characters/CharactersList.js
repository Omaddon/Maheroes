import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'maheroes/src/redux/actions/characters'
/*******************************************************/

class CharactersList extends Component {

    componentWillMount() {
        this.props.fetchCharactersList()
    }

    renderItem(item, index) {
        return(
            <View>
                <Text>CharactersList</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.props.list }
                    renderItem={ ({item, index}) => this.renderItem(item, index) }
                    keyExtractor={ (item, index) => index }
                    extraData={ this.props }
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
            console.log('NAVEGAMOS AL DETALLE... ', character)
            //Actions."nuevo comoponente"({ title: ... })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})