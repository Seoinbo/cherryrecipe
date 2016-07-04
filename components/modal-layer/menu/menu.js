import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import ModalScene from '../modal-scene';

class Menu extends ModalScene {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000'
    },
});

export default Menu;