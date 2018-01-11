import { createElement as e } from './lib/React.js';
import { render } from './lib/react-dom.js';
import { Monotron } from './components/monotron.js';

render(e(Monotron), document.querySelector('.workspace'));
