import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export class Overlay extends Component {
    constructor() {
        super();
        this.state = {
            aboveStatusBar: false,
            isVisible: false
        };
    }
    
    render() {
       if (this.props.isVisible) {
            return (
                <View style={styles.container}>
                    {React.Children.map(this.props.children, React.cloneElement)}
                </View>
            );
        } else {
            return <View />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 0,
        backgroundColor: 'transparent'
    }
})