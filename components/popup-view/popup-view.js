import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {Overlay} from '../overlay/overlay';

export class PopupView extends ViewObject {
    constructor() {
        super();
    }
    
    render() {
        return (
            <Overlay isVisible={this.state.activation} style={[styles.overlay, this.props.style]}>
                <View style={styles.bg}></View>
                <View style={styles.content}>
                    <Text style={styles.tooltip}>It's Tooltip!</Text>
                    <View style={styles.list}>
                        <View style={styles.header}>
                            <Text style={styles.subject}>Subject</Text>
                            <Button icon="expand_more" onPress={() => {this.inactive()}} />
                        </View>
                        <View style={styles.body}>
                            {React.Children.map(this.props.children, React.cloneElement)}
                        </View>
                    </View>
                </View>
            </Overlay>
        )        
    }
}

const styles = StyleSheet.create({
    overlay: {
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