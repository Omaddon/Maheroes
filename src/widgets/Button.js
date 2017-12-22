import React, { Component } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default class Button extends Component {

    static defaultProps = {
        labelStyle: {},
        containerStyle: {},
        spinnerColor: 'white',
        label: '',
        onPress: () => {},
        isFetching: false,
        isEnabled: true
    }

    _onPress() {
        if (!this.props.isFetching) {
            this.props.onPress()
        }
    }

    render() {
        return (
            <TouchableOpacity 
                style={[ styles.container, this.props.containerStyle]} 
                onPress={ () => this._onPress() }>
                
                <Text style={ this.props.isEnabled ? 
                    [ styles.label, this.props.labelStyle ] : 
                    [ styles.label, this.props.labelStyle, { color: 'black' } ] }>
                    { this.props.isEnabled ? this.props.label : '-' }
                </Text>
                { this.props.isFetching ? 
                    <ActivityIndicator 
                        animating
                        color={ this.props.spinnerColor }
                        style={ styles.spinner }
                    /> : null }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 4,
        flexDirection: 'row',
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    spinner: {
        marginLeft: 20,
    }
})