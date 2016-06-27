import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class PreviewCard extends Component {

    render() {
        return (
            <View style={[styles.previewCard, this.props.style]}>
                <Text style={styles.title}>Text preview card</Text>
                <Text style={styles.desc}>{this.props.source.id}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	previewCard: {
        padding: 5,
        height: 180,
        marginBottom: 5,
        marginTop: 8,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderColor: "#d9d9d9"
    },
    title: {
        marginTop: 15,
        textAlign: "center",
        fontSize: 21
    },
    desc: {
        marginTop: 15,
        textAlign: "center"
    }
});

export default PreviewCard;