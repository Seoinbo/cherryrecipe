import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {Util} from '../../services/util';
import {commStyles} from '../styles';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {LabelStorage} from '../../storage/label-storage';

export class LabelItem extends ViewObject {
    constructor(props) {
        super(props);
        this.props = props;
        this.labelStorage = null;
    }
    
    render() {
        let labelID = this.props.source.id;
        
        return (
            <View style={[this.props.style, styles.labelItem]}>
                <Button style={styles.move} icon="dehaze" rendering={this.state.editing}/>
                <TextInput style={styles.labelName} 
                    underlineColorAndroid="transparent"
                    placeholder="input your label name"
                    onFocus={() => {this._onLabelNameFocus()}}
                    onBlur={() => {this._onLabelNameBlur()}}>{this.props.source.id}</TextInput>
                <Button style={styles.remove} icon="clear" visible={this.state.editing} onPress={this.props.onRemove}/>
            </View>
        )
    }
    
    _onLabelNameFocus() {
        Util.apply(this.props.onFocus, [], this);
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