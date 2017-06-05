const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'
import Gamedata from '../models/Gamedata'
import solvings from '../models/solvings'
import Puzzles from '../models/puzzles'
import update from 'immutability-helper';

class Game extends React.Component{

  constructor(options){
    super(options)
    var puzzles = new Puzzles();
    puzzles.all()

    var game = new Gamedata();
    var gameSize = game.grid[0].length * game.grid.length
    this.state = {rows:game.rows, cols:game.cols, grid:game.grid, show:'user', selected: 'blue', uremaining:gameSize, aremaining:gameSize, esize:20}
  }

  componentDidMount(){
    var maxRow = this.getMaxClues(this.state.rows);
    var maxCol = this.getMaxClues(this.state.cols);

    var cheight = this.refs.gamecontainer.clientHeight
    var cwidth = this.refs.gamecontainer.clientWidth

    var maxVGrid = this.state.grid.length
    var maxHGrid = this.state.grid[0].length

    //so, max blocks vertically is rows+ colclues
    //similarly, max blocks horizontally is cols + rowclues
    //however, we want the squares of the grid to be square

    var vBlocks = maxVGrid+maxCol
    var hBlocks = maxHGrid+maxRow

    var vBlockSize = 20;
    var hBlockSize = 20;

    if (cheight > 0 && cheight > 0){
      vBlockSize = parseInt((cheight / vBlocks)-3, 10)
      hBlockSize = parseInt((cwidth / hBlocks)-3, 10)
    }

    if (vBlockSize < hBlockSize){
      hBlockSize = vBlockSize
    }

    //left margin on column data should be the width of the row data

    var leftMargin = maxRow * (hBlockSize + 2)

    console.log('Block size should be: '+hBlockSize)
    console.log('Left margin should be '+leftMargin)

    this.setState({esize: hBlockSize, lmargin: leftMargin})

  }

  getMaxClues(clues){
    var maxLength = 0
    if (clues.length === 0){return 0}
    for(var i = 0; i< clues.length; i++){
      if (clues[i].length > maxLength){
        maxLength = clues[i].length
      }
    }
  return maxLength
  }

  gridClick(options){
    if (this.state.show === "user"){
      var row = options.row;
      var col = options.col;
    // this is not correct because "this" here is from the grid element
    this.updateCells([{row: row, col: col, fillPattern: this.state.selected, auto:false, toggle:true, isRow: true, clue: -1, cluePos: -1}]);
  }

}

identifyBlocks(){
 var cellsFilled = 0;
 var updateData;
 for (var row = 0; row< this.state.rows.length; row++){
  console.log('row '+row)
  updateData = solvings.identifyBlocks({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
  cellsFilled += this.updateCells(updateData)
}
var column;
for (var col = 0; col< this.state.cols.length;col++){
  console.log('col '+col)
  column = [];
  for (var row = 0; row < this.state.rows.length; row++){
   column.push(this.state.grid[row][col]);
 }
 updateData = solvings.identifyBlocks({cells: column, clues: this.state.cols[col], colour: false, row: false})
 cellsFilled += this.updateCells(updateData)
}
return cellsFilled;
}
singleClue(){
  //if the row isn't empty and there's only one clue we should be able to cross out some cells
  var cellsFilled = 0;
  var updateData;
  for (var row = 0; row< this.state.rows.length; row++){
   console.log('row '+row)
   if (this.state.rows[row].length ===1){
     updateData = solvings.singleClue({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
     cellsFilled += this.updateCells(updateData)
   }
 }

 var column;
 for (var col = 0; col< this.state.cols.length;col++){
  console.log('col '+col)
  if (this.state.cols[col].length ===1){
    column = [];
    for (var row = 0; row < this.state.rows.length; row++){
      column.push(this.state.grid[row][col]);
    }
    updateData = solvings.singleClue({cells: column, clues: this.state.cols[col], colour: false, row: false})
    cellsFilled += this.updateCells(updateData)
  }
}
return cellsFilled;
}

edgeProximity(){
  var cellsFilled =0;
  var updateData;
  for (var row = 0; row< this.state.rows.length;row++){
    console.log('row '+row)
    updateData =  solvings.edgeProximity({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
    cellsFilled += this.updateCells(updateData)
  }
  var column;
  for (var col = 0; col< this.state.cols.length;col++){
    console.log('col '+col)
    column = [];
    for (var row = 0; row < this.state.rows.length; row++){
      column.push(this.state.grid[row][col]);
    }
    updateData = solvings.edgeProximity({cells: column, clues: this.state.cols[col], colour: false, row: false})
    cellsFilled += this.updateCells(updateData)
  }
  return cellsFilled;
}

generalOverlap(){
  var cellsFilled = 0;
  var updateData;
  for (var row = 0; row< this.state.rows.length;row++){
    console.log('ROW '+row)
    updateData =  solvings.overlap({cells: this.state.grid[row], clues: this.state.rows[row], colour: false, row: true});
    cellsFilled += this.updateCells(updateData)
  }
  var column;
  for (var col = 0; col< this.state.cols.length;col++){
    column = [];
    for (var row = 0; row < this.state.rows.length; row++){
      column.push(this.state.grid[row][col]);
    }
    console.log('COL '+col)
    updateData = solvings.overlap({cells: column, clues: this.state.cols[col], colour: false, row: false})
    cellsFilled += this.updateCells(updateData)
  }
  return cellsFilled;
}

solveThePuzzle(){
  var remaining = 0;
  var totalSolved =0;
  var solved;
  var noneSolved = false;

  var pass = 1;
  console.log('pass: '+pass);
  solved = this.generalOverlap();
  console.log('General overlap solved '+solved);
  totalSolved += solved;
  solved = this.edgeProximity();
  console.log('Edge proximity solved '+solved);
  totalSolved += solved;
  solved = this.singleClue();
  console.log('Single clue solved '+solved);
  totalSolved += solved;
  solved = this.identifyBlocks();
  console.log('identify blocks solved '+solved);
  totalSolved += solved;
  console.log('total solved on this pass'+totalSolved)
  remaining = this.state.aremaining;
  remaining -= totalSolved;
  this.setState({aremaining: remaining})
  if (remaining > 0){
    console.log('Remaining '+remaining)
    } else {
    console.log('Puzzle is solved - Yay!')
    }
  }


 updateCells(options){
  if (options){
    var uSolved = 0;
    var aSolved = 0;
    for (var i=0; i< options.length; i++){
      var data = options[i];
      if (data.auto){
        if ((data.toggle)&&(this.state.grid[data.row][data.col].autoValue ===data.fillPattern)){
          aSolved -=1;
          this.state.grid[data.row][data.col].autoValue ='clear'
        }
        else if ((this.state.grid[data.row][data.col].autoValue === 'clear')&&(data.fillPattern != 'clear')){
          aSolved += 1;
          this.state.grid[data.row][data.col].autoValue = data.fillPattern;
        }
      } else {
        if ((data.toggle)&&(this.state.grid[data.row][data.col].userValue === data.fillPattern)){
          uSolved -= 1;
          this.state.grid[data.row][data.col].userValue = 'clear';
        }else{
          uSolved += 1;
          this.state.grid[data.row][data.col].userValue = data.fillPattern;
        }
      }
    //something for updating clues here?
    if (data.clue > -1){
      if (data.isRow === true){
        this.state.rows[data.row][data.clue].solved = data.cluePos;
        }else {
        this.state.cols[data.col][data.clue].solved = data.cluePos;
        }
      }
    }
  }
  return aSolved+uSolved; //calling function will know which
}



render(){
  console.log('rendering')
  console.log(this.state.esize)
  console.log(this.state.lmargin)

  return(
    <div id='game' ref='gamecontainer'>
    <div id='gameupper'>

    <Column coldata={this.state.cols} esize={this.state.esize} lmargin={this.state.lmargin}/>
    </div>
    <div id='gamelower'>
    <Row rowdata={this.state.rows} esize={this.state.esize}/>
    <Grid onclick={this.gridClick.bind(this)} griddata={this.state.grid} show= {this.state.show} esize={this.state.esize}/>
    </div>
    </div>
    )
}

}

export default Game;
//<div id='colspacer'>NonoSolver</div>
