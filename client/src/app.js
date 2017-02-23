var React = require('react');
var ReactDOM = require('react-dom');
import GameContainer from './containers/GameContainer';

window.onload = function(){
  ReactDOM.render(
   <GameContainer id="container"/>,
    document.getElementById('app')
  );
}
