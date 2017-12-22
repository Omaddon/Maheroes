import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'

import { Button, Input } from 'maheroes/src/widgets'
import { Colors } from 'maheroes/src/commons'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'maheroes/src/redux/actions/characters'
/*******************************************************/

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nameError: '',

            description: '',
            descriptionError: '',

            comics: '',
            comicsError: '',

            wikiUrl: '',
            wikiUrlError: '',

            detailUrl: '',
            detailUrlError: '',

            image: null
        }
    }

    onSelectImageTapped() {
        const options = {
            title: 'Select heroe image',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker')
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error)
            }
            else {
              this.setState({
                image: response
              })
            }
          })
    }

    validateForm() {
        let valid = true
        let errors = {}

        if (!this.state.name) {
            errors.name = 'Choose a valid name.'
            valid = false
        }

        this.setState({
            nameError: errors.name ? errors.name : '',
        })

        return valid
    }

    onSubmit() {
        if (this.validateForm()) {
            const newHeroe = {
                name: this.state.name,
                description: this.state.description,
                image: this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null,
                wikiUrl : this.state.wikiUrl ? this.state.wikiUrl : null,
                detailUrl : this.statdetailUrl ? this.statdetailUrl : null,
                comics : this.state.comics ? 
                    { items: this.state.comics, available: 1 } : { items: [], available:0 }
            }
            this.props.postHeroe(newHeroe) 
        }
    }

    onCancel() {
        Actions.pop()
    }

    render() {

        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? 'Change image' : 'Choose Image'

        return (
            <ScrollView style={ styles.container }>
                { /******************** IMAGE PICKER ********************/}
                <View style={ styles.imageContainer }>
                    <Image 
                        source      = { imageUri } 
                        style       = { styles.imageContainerBackground }
                        resizeMode  = { 'cover' }
                    />
                    <TouchableOpacity onPress={ () => this.onSelectImageTapped() } style={ styles.imageSelectButton }>
                        <Text style={ styles.textButton }>{ imageButtonText }</Text>
                    </TouchableOpacity>
                </View>
                { /********************* HERO NAME **********************/}
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ name: value }) }
                        value           = { this.state.name }
                        error           = { this.state.nameError }
                        label           = { 'Name:' }
                        placeholder     = { 'Spider-Man' }
                    />
                </View>
                { /******************** DESCRIPTION *********************/}
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ description: value }) }
                        value           = { this.state.description }
                        error           = { this.state.descriptionError }
                        label           = { 'Description:' }
                        placeholder     = { 'I am a hero and have the spider powers!' }
                    />
                </View>
                { /*********************** COMICS ***********************/}
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ comics: value }) }
                        value           = { this.state.comics }
                        error           = { this.state.comicsError }
                        label           = { 'Comics List:' }
                        placeholder     = { 'SpiderMan, Avengers...' }
                    />
                </View>
                { /********************** WIKI URL **********************/}
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ wikiUrl: value }) }
                        value           = { this.state.wikiUrl }
                        error           = { this.state.wikiUrlError }
                        label           = { 'Wiki Url:' }
                        placeholder     = { 'http://myurl.spider-man.com/wiki' }
                    />
                </View>
                { /********************* DETAIL URL *********************/}
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ detailUrl: value }) }
                        value           = { this.state.detailUrl }
                        error           = { this.state.detailUrlError }
                        label           = { 'Detail Url:' }
                        placeholder     = { 'http://myurl.spider-man.com/detail' }
                    />
                </View>
                { /********************** BUTTONS ***********************/}
                <View style={ styles.buttonContainer }>
                    <Button
                        label           = { 'Create' }
                        containerStyle  = { styles.button }
                        onPress         = { () => this.onSubmit() }
                        isFetching      = { this.props.isFetching }
                    />
                    <Button
                        label           = { 'Cancel' }
                        containerStyle  = { styles.button }
                        onPress         = { () => this.onCancel() }
                    />
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postHeroe : (newHeroe) => {
            dispatch(CharactersAction.postHeroe(newHeroe))
            Actions.pop()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        backgroundColor: 'grey'
    },
    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    imageSelectButton: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    inputContainer: {
        margin: 10
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        margin: 10
    }
})