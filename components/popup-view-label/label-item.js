import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Keyboard
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

        this.state = Object.assign({}, this.state, {
            selectMode: true
        });

        this._listeners = [];
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            this.setState({
                selectMode: false
            });
        });

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (event) => {
            this.setState({
                selectMode: true
            });
            this._blur();
        });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    render() {
        let {
            source,
            checkMode,
            onUpdate
        } = this.props;

        let checkbox = <View/>;
        if (checkMode) {
            checkbox = <Checkbox  style={styles.checkbox} />;
        }

        let hitArea = <View/>;
        if (this.state.selectMode) {
            hitArea = <TouchableHighlight 
                style={styles.hitArea}
                underlayColor="paleturquoise"
                visible={checkMode}
                onPress={()=>this._select()}
                onLongPress={()=>this._focus()}>
                <View/>
            </TouchableHighlight>
        }

        return (
            <View style={[this.props.style, styles.labelItem]}>
                <Button style={styles.move} icon="dehaze" rendering={this.state.editing}/>
                <View style={styles.itemWrapper}>
                    {checkbox}
                    <View style={styles.labelNameWrap}>
                        <TextInput
                            ref="textField"
                            style={styles.labelName} 
                            underlineColorAndroid="transparent"
                            placeholder="Input your label name"
                            returnKeyType="done"
                            onChangeText={onUpdate}
                            onFocus={() => {this._onLabelNameFocus()}}
                            onBlur={() => {this._onLabelNameBlur()}}>
                            {source.name}
                        </TextInput>
                        {hitArea}
                    </View>
                    <Button style={styles.editMode} icon="mode_edit" visible={!this.state.editing && this.state.selectMode} onPress={() => this._focus()}/>
                    <Button style={styles.remove} icon="clear" visible={this.state.editing} onPress={this.props.onRemove}/>
                </View>
            </View>
        )
    }

    _focus() {
        this.refs.textField.focus();
    }

    _blur() {
        this.refs.textField.blur();
    }

    _select() {
        Util.apply(this.props.onSelect, [this.props.source]);
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
        marginLeft: 40
    },
    checkbox: {
    },
    labelNameWrap: {
        flex: 1
    },
    labelName: {
        flex: 1,
        fontSize: commStyles.fontSize
    },
    hitArea: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    editMode: {
        marginRight: 10
    },
    remove: {
        marginRight: 10
    }
});