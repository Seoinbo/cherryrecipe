import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import {Button} from '../button/button';

export class PopupView extends Component {
    constructor() {
        super();
        alert(2);
    }

    render() {
        return (
            <View style={[styles.popupView, this.props.style]}>
                <View style={styles.bg}></View>
                <View style={styles.content}>
                    <Text style={styles.tooltip}>It's Tooltip!</Text>
                    <View style={styles.list}>
                        <View style={styles.header}>
                            <Text style={styles.subject}>Subject</Text>
                            <Button icon="expand_more"/>
                        </View>
                        <View style={styles.body}>
                            <Text>here contents</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    
    _onPressButton() {
        alert(1);
    }
}

const styles = StyleSheet.create({
    popupView: {
        flex: 1
    },
    bg: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: '#ffffff'
    },
    content: {
        
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#b0c4de'
    },
    subject: {
        fontSize: 18
    },
    subjectbox: {
      
    }
});