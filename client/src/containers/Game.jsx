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


  gridClick(options){
    //know col and row
    var row = options.row;
    var col = options.col;
    // this is not correct because "this" here is from the grid element
    this.state.grid[row][col].colour = 'blue';
    this.forceUpdate();
  }

  fillCells(data){
    if (data.length >0){
    for (var i=0; i< data.length; i++){
      // fillCell(data.row,data.col,data.fillPattern)
      }
    }
  }



  render(){
    return(
      <div id='content'>
      <div id='game'>
      <div id='colspacer'></div>
      <Column coldata={this.state.cols}/>
      <Row rowdata={this.state.rows}/>
      <Grid onclick={this.gridClick.bind(this)} griddata={this.state.grid}/>
      <Sidebar/>
      </div>
      </div>
      )
  }

}

export default Game;