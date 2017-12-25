import React from './lib/React.js';
import ReactDOM from './lib/react-dom.js';
import { Monotron } from './components/monotron.js';

const e = React.createElement;

ReactDOM.render(e(Monotron), document.querySelector('.workspace'));
