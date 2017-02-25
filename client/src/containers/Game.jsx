const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'
class Game extends React.Component{

  render(){
    return(
      <div id='content'>
      <div id='game'>
      <div id='colspacer'></div>
      <Column/>
      <Row/>
      <Grid/>
      <Sidebar/>
      </div>
      </div>
      )
  }

}

export default Game;