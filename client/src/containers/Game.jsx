const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'
import Gamedata from '../models/Gamedata'
import solvings from '../models/solvings'
// import Puzzles from '../models/puzzles'
import update from 'immutability-helper';

class Game extends React.Component{

  constructor(options){
    super(options)
    console.log(options)
    var game = options.current
    var gameSize
    if (game != null){
    gameSize = game.grid[0].length * game.grid.length
    } else {
    gameSize = 0
    }
    this.state = {selected: 'blue', uremaining:gameSize, aremaining:gameSize, esize:20}
    
  }

  componentWillReceiveProps(nextProps){
    //Is there a new game
    if ((this.props.options.current != nextProps.options.current)&&(nextProps.options.current != null)){
      console.log('props changing')
      console.log(nextProps.options.current)
      var maxRow = this.getMaxClues(nextProps.options.current.rows);
      var maxCol = this.getMaxClues(nextProps.options.current.cols);
      var maxVGrid = nextProps.options.current.grid.length
      var maxHGrid = nextProps.options.current.grid[0].length
    } else{
      var maxRow = 0;
      var maxCol = 0;
      var maxVGrid = 0
      var maxHGrid = 0
    }
    var cheight = this.refs.gamecontainer.clientHeight
    var cwidth = this.refs.gamecontainer.clientWidth
    var vBlocks = maxVGrid+maxCol
    var hBlocks = maxHGrid+maxRow
    console.log(vBlocks)
    console.log(hBlocks)
    
    if (cheight > 0 && cwidth > 0 && vBlocks > 0 && hBlocks > 0){
      vBlockSize = parseInt((cheight / vBlocks)-3, 10)
      hBlockSize = parseInt((cwidth / hBlocks)-3, 10)
    } else {
      var vBlockSize = 20;
      var hBlockSize = 20;
    }

    if (vBlockSize < hBlockSize){
      hBlockSize = vBlockSize
    }
    console.log(maxRow)
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
  console.log('Render game. esize and margin below')
  console.log(this.state.esize)
  console.log(this.state.lmargin)
  if (this.props.options.current != null){
    return(
      <div id='game' ref='gamecontainer'>
      <div id='gameupper'>

      <Column coldata={this.props.options.current.cols} esize={this.state.esize} lmargin={this.state.lmargin}/>
      </div>
      <div id='gamelower'>
      <Row rowdata={this.props.options.current.rows} esize={this.state.esize}/>
      <Grid onclick={this.gridClick.bind(this)} griddata={this.props.options.current.grid} show= {this.props.options.show} esize={this.state.esize}/>
      </div>
      </div>
      )
    } else {
      return(
      <div id='game' ref='gamecontainer'>
      </div>  
      )
    }
  }
}

export default Game;

