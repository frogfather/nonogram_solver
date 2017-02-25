const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'

import Gamedata from '../models/Gamedata'

class Game extends React.Component{
  constructor(options){
    super(options)
    var testGame = new Gamedata();
    this.state = {rows:testGame.rows, cols:testGame.cols, grid:testGame.grid}
  }

  gridClick(event){
    // event.persist();
    console.log(event);
  }

  render(){
    return(
      <div id='content'>
      <div id='game'>
      <div id='colspacer'></div>
      <Column coldata={this.state.cols}/>
      <Row rowdata={this.state.rows}/>
      <Grid onclick={this.gridClick} griddata={this.state.grid}/>
      <Sidebar/>
      </div>
      </div>
      )
  }

}

export default Game;