import React, {Component} from 'react';

export class ViewObject extends Component {
    constructor() {
        super();
        this.state = {
            activation: false,
            visibility: false,
            rendering: true,
            editing: false
        };
    }
    
    active() {
        if (!this.state.visibility) {
            this.show();
        }
        this.setState({activation: true});
    }

    inactive() {
        this.setState({activation: false});
    }

    toggleActivation() {
        if (this.state.activation) {
            this.inactive();
        } else {
            this.active();
        }
    }
    
    show() {
        this.setState({visibility: true});
    }

    hide() {
        this.setState({visibility: false});
    }
}