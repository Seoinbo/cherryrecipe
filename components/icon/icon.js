import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

export class Icon extends Component {
    render() {
        return (
            <View style={[styles.icon, this.props.style]}>
                <Svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>
                    <Path d="M0 0h24v24H0z" fill="none"/>
                </Svg>
            </View>
        )
    }
    _onPressButton() {
        alert(1);
    }
}

const styles = StyleSheet.create({
  icon: {
  }
});
