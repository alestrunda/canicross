import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(reducers);
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
