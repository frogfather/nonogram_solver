const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'

import Gamedata from '../models/Gamedata'

class Game extends React.Component{
  constructor(options){
    super(options)
    var game = new Gamedata();
    this.state = {rows:game.rows, cols:game.cols, grid:game.grid, showauto:true, selected: 'blue'}
  }


  gridClick(options){
    //know col and row
    var row = options.row;
    var col = options.col;
    // this is not correct because "this" here is from the grid element    
    this.updateCells([{row: row, col: col, fillPattern: this.state.selected, auto:false, toggle:true}]);
  }

  checkClick(event){
    console.log(event.target.checked)
    if (event.target.checked){
    this.state.selected = 'cross';
    console.log(this.state)
    }else
    {
    this.state.selected = 'blue'
    }
  console.log(this.state)
  }

  updateCells(options){
    if (options.length >0){
    for (var i=0; i< options.length; i++){
      var data = options[i];
      var currentDisplay = this.state.grid[data.row][data.col].displayValue;
      var currentAuto = this.state.grid[data.row][data.col].autoValue;
      var fillPattern = data.fillPattern;

        if (data.auto){
        if ((data.toggle)&&(currentAuto ===data.fillPattern)){
        this.state.grid[data.row][data.col].autoValue ='clear'  
        } 
        else {
        this.state.grid[data.row][data.col].autoValue = data.fillPattern;
        }

        if (this.state.showauto){
          this.state.grid[data.row][data.col].displayValue = autoValue
          }
        } else {
          if ((data.toggle)&&(currentDisplay ===data.fillPattern)){
          this.state.grid[data.row][data.col].displayValue = 'clear';
          }else{
          this.state.grid[data.row][data.col].displayValue = data.fillPattern;
          }
        }
      
      if ((this.state.grid[data.row][data.col].displayValue === 'cross')||(this.state.grid[data.row][data.col].displayValue === 'clear')){
        this.state.grid[data.row][data.col].colour = 'gray';
        }
        else{
        this.state.grid[data.row][data.col].colour = fillPattern;
        }
      }
    this.forceUpdate();  
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
      <Sidebar onclick={this.checkClick.bind(this)}/>
      </div>
      </div>
      )
  }

}

export default Game;