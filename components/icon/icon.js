import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

class Icon extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let path;
        switch (this.props.name) {
        case 'autorenew':
            path = require("../../images/icons/ic_autorenew.png");
            break;
        case 'dehaze':
            path = require("../../images/icons/ic_dehaze.png");
            break;
        case 'settings':
            path = require("../../images/icons/ic_settings.png");
            break;
        case 'expand_less':
            path = require("../../images/icons/ic_expand_less.png");
            break;
        case 'expand_more':
            path = require("../../images/icons/ic_expand_more.png");
            break;
        case 'clear':
            path = require("../../images/icons/ic_clear.png");
            break;
        case 'add':
            path = require("../../images/icons/ic_add.png");
            break;
        case 'done':
            path = require("../../images/icons/ic_done.png");
            break;
        }
        
        let imgSize = {};
        if (this.props.iconWidth) {
            imgSize.width = +this.props.iconWidth;
        }
        if (this.props.iconHeight) {
            imgSize.height = +this.props.iconHeight;
        }
        return (
            <View style={[this.props.style]}>
                <Image style={imgSize} source={path} />
            </View>
        );
    }
};

const styles = {
}

export default Icon;