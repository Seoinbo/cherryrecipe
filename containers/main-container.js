import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from './router';

class MainContainer extends Component {
    render() {
        return (
            <Router {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    return {
        keyboardState: state.keyboardState
    }
}

export default connect(mapStateToProps)(MainContainer);