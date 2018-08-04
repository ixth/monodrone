import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import Monotron from './components/Monotron';

ReactDOM.render(
    <Provider store={store}>
        <Monotron />
    </Provider>,
    document.querySelector('.workspace')
);
