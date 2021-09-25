import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'core-js/modules/esnext.math.clamp';

import MonotronContainer from 'containers/Monotron';
import store from 'store';

ReactDOM.render(
    <Provider store={store}>
        <MonotronContainer />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);