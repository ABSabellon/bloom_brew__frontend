import React from "react";
import ReactDOM from "react-dom";
import Main from './app/EntryFile/Main';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(<Main/>, document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}