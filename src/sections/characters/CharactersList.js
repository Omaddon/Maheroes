import React, { Component } from 'react'
import { ListView, View, StyleSheet, RefreshControl } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from 'maheroes/src/commons'

import CharacterCell from './CharacterCell'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'maheroes/src/redux/actions/characters'
/*******************************************************/

class CharactersList extends Component {

    constructor(props) {
        super(props)

        this.renderRow = this.renderRow.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentWillMount() {
        this.props.initCharactersList()
    }

    onSelect(character) {
        this.props.updateCharacterSelected(character)
    }

    renderRow(rowData) {
        return (
            <CharacterCell 
                item        = { rowData } 
                onSelect    = { (character) => { this.onSelect(character) } }
            />
        )
    }

    onEndReached() {
        console.log(this.props.isFetching)
        if (this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + 10
            this.props.fetchCharactersList(newOffset)
        }
    }

    render() {

        const list = this.props.list
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        const dataSource = ds.cloneWithRows(list)

        return (
            <View style={ styles.container }>
                <ListView
                    dataSource          = { dataSource }
                    renderRow           = { this.renderRow }
                    onEndReached        = { this.onEndReached }
                    enableEmptySections = { true }
                />
                { /* refreshControl: isFetching 'undefined'!!!! */ } 
                {/*
                    refreshControl      = {
                                            <RefreshControl
                                                refreshing  = { this.props.isFetching }
                                                onRefresh   = { () => this.props.initCharactersList() }
                                                colors      = { ['white'] }
                                                tintColor   = { 'white' }
                                            />
                                        }

                */}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list:       state.characters.list,
        selected:   state.characters.selected,
        total:      state.characters.total,
        offset:     state.characters.offset,
        isFetching: state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        initCharactersList: () => {
            dispatch(CharactersAction.initCharactersList())
        },
        fetchCharactersList: (offset) => {
            dispatch(CharactersAction.updateCharactersListOffset(offset))
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
    }
})