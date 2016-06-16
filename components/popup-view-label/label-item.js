import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {Util} from '../../services/util';
import {commStyles} from '../styles';
import ViewObject from '../view-object/view-object';
import {Button} from '../button/button';
import Checkbox from '../checkbox/checkbox';

export class LabelItem extends ViewObject {
    constructor(props, context) {
        super(props, context);
        this.props = props;
    }
    
    render() {
        let labelID = this.props.source.id;
        return (
            <View style={[this.props.style, styles.labelItem]}>
                <Button style={styles.move} icon="dehaze" rendering={this.state.editing}/>
                <View style={styles.itemWrapper}>
                    <Checkbox  style={styles.checkbox}/>
                    <TextInput style={styles.labelName} 
                        underlineColorAndroid="transparent"
                        placeholder="input your label name"
                        onFocus={() => {this._onLabelNameFocus()}}
                        onBlur={() => {this._onLabelNameBlur()}}>
                        {this.props.source.id}
                    </TextInput>
                    <Button style={styles.remove} icon="clear" visible={this.state.editing} onPress={this.props.onRemove}/>
                </View>
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
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 15
    },
    move: {
        position: 'absolute',
        top: 10
    },
    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35
    },
    checkbox: {
    },
    labelName: {
        flex: 1,
        fontSize: commStyles.fontSize
    },
    remove: {
        marginRight: 10
    }
});