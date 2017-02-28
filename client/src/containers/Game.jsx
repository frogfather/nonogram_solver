const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'
import Gamedata from '../models/Gamedata'
import solvings from '../models/solvings'

class Game extends React.Component{

  constructor(options){
    super(options)
    var game = new Gamedata();
    this.state = {rows:game.rows, cols:game.cols, grid:game.grid, show:'user', selected: 'blue'}
  }


  gridClick(options){
    if (this.state.show === "user"){
    var row = options.row;
    var col = options.col;
    // this is not correct because "this" here is from the grid element    
    this.updateCells([{row: row, col: col, fillPattern: this.state.selected, auto:false, toggle:true}]);
    }
    
  }

  checkClick(event){
    var ischecked = event.target.checked;
    if (event.target.id === 'ckcross'){
      console.log(this.state.grid)
      if (ischecked){
        this.state.selected = 'cross';
        }else
        {
        this.state.selected = 'blue'
        }
      }else if (event.target.id ==='ckauto'){
        var showState;
        if (ischecked) {
          this.setState({show: 'auto'}) 
          showState = 'auto';
        }else{
          this.setState({show: 'user'})
          showState = 'user';
        }  
        for (var y = 0; y< this.state.cols.length; y++){
          for (var x = 0; x< this.state.rows.length; x++){
        this.state.grid[x][y].show = showState;
        } 
       }
      }
    }

  singleClue(){
  //if the row isn't empty and there's only one clue we should be able to cross out some cells
  var updateData;
  for (var row = 0; row< this.state.rows.length; row++){
    if (this.state.rows[row].length ===1){
   updateData = solvings.singleClue({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
    this.updateCells(updateData)
    }
  }
    
    var column;
    for (var col = 0; col< this.state.cols.length;col++){
      if (this.state.cols[col].length ===1){  
      column = [];
      for (var row = 0; row < this.state.rows.length; row++){
        column.push(this.state.grid[row][col]);
      }
    updateData = solvings.singleClue({cells: column, clues: this.state.cols[col], colour: false, row: false})
    this.updateCells(updateData)
      }
    }  
  }

  edgeProximity(){
    var updateData;
    for (var row = 0; row< this.state.rows.length;row++){
     updateData =  solvings.edgeProximity({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
      this.updateCells(updateData)
    }
    var column;
    for (var col = 0; col< this.state.cols.length;col++){
      column = [];
      for (var row = 0; row < this.state.rows.length; row++){
        column.push(this.state.grid[row][col]);
      }
    updateData = solvings.edgeProximity({cells: column, clues: this.state.cols[col], colour: false, row: false})
    this.updateCells(updateData)
    
  }
}

  generalOverlap(){
    var updateData;
    for (var row = 0; row< this.state.rows.length;row++){
     updateData =  solvings.overlap({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
      this.updateCells(updateData)
    }
    var column;
    for (var col = 0; col< this.state.cols.length;col++){
      column = [];
      for (var row = 0; row < this.state.rows.length; row++){
        column.push(this.state.grid[row][col]);
      }
    updateData = solvings.overlap({cells: column, clues: this.state.cols[col], colour: false, row: false})
    this.updateCells(updateData)
    }
  }

  solveThePuzzle(){
    this.generalOverlap();
    this.edgeProximity();
    this.singleClue();
  }

  buttonClick(event){
   this.solveThePuzzle();
  }

  updateCells(options){
    if (options){
    for (var i=0; i< options.length; i++){
      var data = options[i];
        if (data.auto){
        if ((data.toggle)&&(this.state.grid[data.row][data.col].autoValue ===data.fillPattern)){
        this.state.grid[data.row][data.col].autoValue ='clear'  
        } 
        else {
        this.state.grid[data.row][data.col].autoValue = data.fillPattern;
          }
        } else {
          if ((data.toggle)&&(this.state.grid[data.row][data.col].userValue === data.fillPattern)){
          this.state.grid[data.row][data.col].userValue = 'clear';
          }else{
          this.state.grid[data.row][data.col].userValue = data.fillPattern;
          }
        } 
      }
    }  
  this.forceUpdate();
  //should return free cell count  
  }



  render(){
    return(
      <div id='content'>
      <div id='game'>
      <div id='colspacer'></div>
      <Column coldata={this.state.cols}/>
      <Row rowdata={this.state.rows}/>
      <Grid onclick={this.gridClick.bind(this)} griddata={this.state.grid} show= {this.state.show}/>
      <Sidebar onclick={this.checkClick.bind(this)} onbutton={this.buttonClick.bind(this)}/>
      </div>
      </div>
      )
  }

}

export default Game;