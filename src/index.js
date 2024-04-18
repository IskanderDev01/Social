import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import store from './redux/redux-store';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';

const rerendered = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Router>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerendered()

store.subscribe(()=>{
    rerendered()
})