import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

export class ToggleView extends Component {
    render() {
        var rendering = true;
        var visible = true;
        
        if (this.props.rendering !== undefined) {
            rendering = this.props.rendering;
        }
        if (this.props.visible !== undefined) {
            visible = this.props.visible;
        }  
        
        if (rendering) {
            if (visible) {
                return (
                    <View style={this.props.style}>{this.props.children}</View>
                )
            } else {
                let s = {};
                if (this.props.style.width) {
                    s.width = this.props.style.width; 
                }
                if (this.props.style.height) {
                    s.height = this.props.style.height; 
                }
                return (
                    <View style={StyleSheet.create(s)}/>
                )
            }
        } else {
            return <View/>;
        }
    }
}
