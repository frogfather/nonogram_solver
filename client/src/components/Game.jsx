const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
class Game extends React.Component{

 

  render(){
    return(
      <div id='game'>
      <div id='colspacer'>colspacer</div>
      <Column/>
      <Row/>
      <Grid/>
      </div>
      )
  }

}

export default Game;