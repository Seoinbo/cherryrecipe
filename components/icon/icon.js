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
        case 'add':
            path = require("../../images/icons/ic_add.png");
            break;
        case 'alarm':
            path = require("../../images/icons/ic_alarm.png");
            break;
        case 'arrow_back':
            path = require("../../images/icons/ic_arrow_back.png");
            break;
        case 'autorenew':
            path = require("../../images/icons/ic_autorenew.png");
            break;
        case 'clear':
            path = require("../../images/icons/ic_clear.png");
            break;
        case 'dehaze':
            path = require("../../images/icons/ic_dehaze.png");
            break;
        case 'delete':
            path = require("../../images/icons/ic_delete.png");
            break;
        case 'done':
            path = require("../../images/icons/ic_done.png");
            break;
        case 'expand_less':
            path = require("../../images/icons/ic_expand_less.png");
            break;
        case 'expand_more':
            path = require("../../images/icons/ic_expand_more.png");
            break;
       case 'file_download':
            path = require("../../images/icons/ic_file_download.png");
            break;
        case 'label':
            path = require("../../images/icons/ic_label.png");
            break;
        case 'menu':
            path = require("../../images/icons/ic_menu.png");
            break;
        case 'mode_edit':
            path = require("../../images/icons/ic_mode_edit.png");
            break;
        case 'more_horiz':
            path = require("../../images/icons/ic_more_horiz.png");
            break;
        case 'more_vert':
            path = require("../../images/icons/ic_more_vert.png");
            break;
        case 'public':
            path = require("../../images/icons/ic_public.png");
            break;
        case 'publish':
            path = require("../../images/icons/ic_publish.png");
            break;
        case 'search':
            path = require("../../images/icons/ic_search.png");
            break;
        case 'settings':
            path = require("../../images/icons/ic_settings.png");
            break;
        case 'share':
            path = require("../../images/icons/ic_share.png");
            break;
	    case 'shopping_cart':
            path = require("../../images/icons/ic_shopping_cart.png");
            break;
        case 'visibility':
            path = require("../../images/icons/ic_visibility.png");
            break;
        case 'visibility_off':
            path = require("../../images/icons/ic_visibility_off.png");
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