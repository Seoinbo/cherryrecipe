import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import ViewObject from '../view-object/view-object';
import Button from '../button/button';

class PreviewCard extends ViewObject {

    constructor(props, context) {
        super(props, context);

        // bind events.
        this.openDetail = this.openDetail.bind(this);
    }

    openDetail() {
        this.props.rnavigator.push({
            name: 'detail',
            index: 2,
            recipeID: this.props.source.id
        });
    }
    
    render() {
        return (
            <TouchableHighlight onPress={this.openDetail} underlayColor="transparent">
                <View style={[styles.previewCard, this.props.style]}>
                    <Text style={styles.title}>Text preview card</Text>
                    <Text style={styles.desc}>{this.props.source.id}</Text>
                </View>
            </TouchableHighlight>
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