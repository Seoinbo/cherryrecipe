import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import {Button} from '../button/button';
import {PopupView} from '../popup-view/popup-view';

export class PopupViewLabel extends Component {
    render() {
        return (
            <PopupView ref="popupView" style={[styles.popupView, this.props.style]}>
                <Text>here contents</Text>
            </PopupView>
        )
    }
    
    open() {
        this.refs.popupView.open();
    }
    
    close() {
        this.refs.popupView.close();
    }
    
    toggle() {
        this.refs.popupView.toggle();
    }
}

const styles = StyleSheet.create({
    popupView: {
    }
});