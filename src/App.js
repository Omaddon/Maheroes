/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'

import * as webservices from 'maheroes/src/webservices/webservices'

/********************* COMPONENTS **********************/
import CharactersList from 'maheroes/src/sections/characters/CharactersList'
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
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
