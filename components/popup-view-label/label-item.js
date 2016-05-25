import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {commStyles} from '../styles';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';

export class LabelItem extends ViewObject {
    render() {
        return (
            <View style={[this.props.style, styles.labelItem]}>
                <Button style={styles.move} icon="dehaze" rendering={this.state.editing}/>
                <TextInput style={styles.labelName} 
                    placeholder="input your label name"
                    onFocus={() => {this._onLabelNameFocus()}}
                    onBlur={() => {this._onLabelNameBlur()}}>{this.props.source.name}</TextInput>
                <Button style={styles.remove} icon="clear" visible={this.state.editing}/>
            </View>
        )
    }
    
    _onLabelNameFocus() {
        this.enterEditMode();
    }
    
    _onLabelNameBlur() {
        this.exitEditMode();
    }
}

const styles = StyleSheet.create({
    labelItem: {
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