import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom
import Main from './app/EntryFile/Main';
import dotenv from 'dotenv';

dotenv.config();

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('app'));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
