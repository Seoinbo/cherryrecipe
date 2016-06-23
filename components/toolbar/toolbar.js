import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class Toolbar extends Component {

    render() {
        return (
            <View style={[styles.toolbar, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
	toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#ffffff'
    }
});

export default Toolbar;