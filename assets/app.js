/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// start the Stimulus application
import './bootstrap';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <Navigation />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
