import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';
import {commStyles} from '../styles';
import {ViewObject} from '../view-object/view-object';
import {Button} from '../button/button';
import {PopupView} from '../popup-view/popup-view';
import {LabelItem} from './label-item.js';

export class PopupViewLabel extends ViewObject {
    constructor() {
        super();
        var labelSource = new ListView.DataSource({rowHasChanged: this._labelDataChange}); 
        this.state = Object.assign(this.state, {
            arrLabelData: labelSource.cloneWithRows(this._getLabelData())
        });
    }
    
    _getLabelData() {
         var data = [
          {name: 'first', idx: 0},
          {name: 'bbbb', idx: 1},
          {name: 'bbbb', idx: 1},
          {name: 'bbbb', idx: 1},
          {name: 'bbbb', idx: 1},
          {name: 'bbbb', idx: 1},
          {name: 'bbbb', idx: 1},
          {name: 'bbbb', idx: 1},
          {name: 'last', idx: 1}
        ];
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
                title="Labels"
                tooltip="라벨을 선택해주세요">
                <ListView 
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