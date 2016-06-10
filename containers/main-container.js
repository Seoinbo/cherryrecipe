import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from '../components/main';

class MainContainer extends Component {
    render() {
        console.log("props2: ", this.props);
        return (
            <Main {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    return {
        keyboardState: state.keyboardState
    }
}

export default connect(mapStateToProps)(MainContainer)