import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';

import MonotronContainer from 'containers/Monotron';

ReactDOM.render(
    <Provider store={store}>
        <MonotronContainer />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
