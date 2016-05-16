import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

export class Icon extends Component {
    render() {
        let path;
        switch (this.props.name) {
        case 'autorenew':
            path = require("../../images/icons/ic_autorenew.png");
            break;
        case 'dehaze':
            path = require("../../images/icons/ic_dehaze.png");
            break;
        case 'setting':
            path = require("../../images/icons/ic_settings.png");
            break;
        }
        return (
            <View>
                <Image source={path} />
            </View>
        );
    }
};