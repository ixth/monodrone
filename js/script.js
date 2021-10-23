import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class AudioContext extends Component {
    constructor(props, context) {
        super(props, context);
        this.audioContext = new window.AudioContext();
    }

    getChildContext() {
        return { audioContext: this.audioContext };
    }

    render() {
        return Children.only(this.props.children);
    }
}

class Oscillator extends Component {
    constructor(props, context) {
        super(props, context);
        this.node = context.audioContext.createOscillatorNode();
    }

    render() {
        return null;
    }
}

Oscillator.contextTypes = { audioContext: PropTypes.object };

function Root() {
    return (
        <AudioContext>
            <Oscillator/>
        </AudioContext>
    );
}

ReactDOM.render(<Root/>, document.querySelector('.root'));
