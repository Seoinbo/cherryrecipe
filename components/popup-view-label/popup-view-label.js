import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    TouchableHighlight,
    RecyclerViewBackedScrollView
} from 'react-native';
import {commStyles} from '../styles';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {PopupView} from '../popup-view/popup-view';
import {LabelItem} from './label-item.js';
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scroll-view';
import {LabelData} from '../../schemas/label-data';

export class PopupViewLabel extends ViewObject {
    constructor() {
        super();
        var labelSource = new ListView.DataSource({rowHasChanged: this._labelDataChange}); 
        this.state = Object.assign(this.state, {
            arrLabelData: labelSource.cloneWithRows(this._getLabelData())
        });
        
        // localStorage via labels.
        this.labelStorage = new LabelData();
    }
    
    _getLabelData() {
        
        console.log("con: ", this);
        let data = this.labelStorage.realm.objects('Label');
        console.log('lable: ', data);
        
        return data;
    }
    
    _labelDataChange(r1, r2) {
        console.log('callback', r1, r2);
    }
    
    _renderRow(data) {
        return (
            <LabelItem source={data}/>
        )
    }
    
    render() {
        return (
            <PopupView ref="popupView" 
                style={[styles.popupView, this.props.style]}
                boxHeight={350}
                title="Labels"
                tooltip="라벨을 선택해주세요">
                <KeyboardAwareListView
                    renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                    keyboardShouldPersistTaps={true} 
                    dataSource={this.state.arrLabelData}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => {
                        return this._renderRow(rowData)}
                    }
                />
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
});