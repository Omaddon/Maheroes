/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'

import * as webservices from 'maheroes/src/webservices/webservices'
import { Colors } from 'maheroes/src/commons'

/********************* COMPONENTS **********************/
import CharactersList from 'maheroes/src/sections/characters/CharactersList'
import CharacterDetail from 'maheroes/src/sections/characters/CharacterDetail'
import CharacterNew from 'maheroes/src/sections/characters/CharacterNew'
/*******************************************************/

/************************ REDUX ************************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
/*******************************************************/

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content')
  }

  addHeroeButton() {
    return (
      <TouchableOpacity 
        onPress = { () => Actions.CharacterNew({ title: 'New Heroe' }) } 
        style   = { styles.addButton }>

        <Text style={ styles.addButtonText }>{ '+' }</Text>

      </TouchableOpacity>
    )
  }

  render() {

    console.disableYellowBox = true

    return (
      <Provider store={ store }>
        <Router>
          <Scene key='root'>
            <Scene
              key                 = 'CharacterList'
              component           = { CharactersList }
              navigationBarStyle  = { styles.navBar }
              navBarButtonColor   = { 'white' }
              title               = { 'Marvel Heroes' }
              backTitle           = { null }
              renderRightButton   = { () => this.addHeroeButton() }
            />
            <Scene
              key                 = 'CharacterDetail'
              component           = { CharacterDetail }
              navigationBarStyle  = { styles.navBar }
              navBarButtonColor   = { 'white' }
            />
            <Scene
              key                 = 'CharacterNew'
              component           = { CharacterNew }
              navigationBarStyle  = { styles.navBar }
              navBarButtonColor   = { 'white' }
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.navBar
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  addButton: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
  },
  optionsButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
