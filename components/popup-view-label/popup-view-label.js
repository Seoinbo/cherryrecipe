import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
} from 'react-native';
import {commStyles} from '../styles';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {PopupView} from '../popup-view/popup-view';

export class PopupViewLabel extends ViewObject {
    render() {
        return (
            <PopupView ref="popupView" 
                style={[styles.popupView, this.props.style]}
                title="Labels"
                tooltip="라벨을 선택해주세요">
                <View>
                    <View style={styles.item}>
                        <Button style={styles.move} icon="dehaze" rendering={this.state.editing}/>
                        <TextInput style={styles.labelName} placeholder="input your label name"></TextInput>
                        <Button style={styles.remove} icon="clear" visible={this.state.editing}/>
                    </View>
                    <View style={styles.item}>
                        <Button style={styles.move} icon="dehaze" rendering={false}/>
                        <TextInput style={styles.labelName} placeholder="input your label name"></TextInput>
                        <Button style={styles.remove} icon="clear" visible={this.state.editing}/>
                    </View>
                </View>
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
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center' 
    },
    move: {
        position: 'absolute',
        top: 10
    },
    labelName: {
        flex: 1,
        fontSize: commStyles.fontSize,
        marginLeft: 50
    },
    remove: {
        marginRight: 10
    }
});