import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Monotron from 'components/Monotron';

ReactDOM.render(
    <Provider store={store}>
        <Monotron />
    </Provider>,
    document.querySelector('.workspace')
);
