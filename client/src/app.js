var React = require('react');
var ReactDOM = require('react-dom');
import Surround from './containers/Surround';

window.onload = function(){
  ReactDOM.render(
   <Surround/>,
    document.getElementById('app')
  );
}
