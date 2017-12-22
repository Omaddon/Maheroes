/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'

import * as webservices from 'maheroes/src/webservices/webservices'
import { Colors } from 'maheroes/src/commons'

/********************* COMPONENTS **********************/
import CharactersList from 'maheroes/src/sections/characters/CharactersList'
import CharacterDetail from 'maheroes/src/sections/characters/CharacterDetail'
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

  render() {

    console.disableYellowBox = true

    return (
      <Provider store={ store }>
        <Router>
          <Scene key='root'>
            <Scene
              key='CharacterList'
              component={ CharactersList }
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ 'white' }
              title={ 'Marvel Heroes' }
              backTitle= { null }
            />
            <Scene
              key='CharacterDetail'
              component={ CharacterDetail }
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ 'white' }
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
  }
})
