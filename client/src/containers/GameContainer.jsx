const React = require('react');
import ajax from '../ajax';
import Game from '../components/Game';
import Sidebar from '../components/Sidebar'

class GameContainer extends React.Component{


  render(){
    return(
      <div>
      Game Container
      <Game id="game"/>
      <Sidebar id="sidebar"/>
      </div>
      )
  }
}

export default GameContainer;