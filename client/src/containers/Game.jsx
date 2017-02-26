const React = require('react');
import Column from '../components/Column'
import Row from '../components/Row'
import Grid from '../components/Grid'
import Sidebar from '../components/Sidebar'
import Solvings from '../models/Solvings'
import Gamedata from '../models/Gamedata'

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


  updateCells(options){
    console.log('update cells')
    if (options.length >0){
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
  }



  render(){
    return(
      <div id='content'>
      <div id='game'>
      <div id='colspacer'></div>
      <Column coldata={this.state.cols}/>
      <Row rowdata={this.state.rows}/>
      <Grid onclick={this.gridClick.bind(this)} griddata={this.state.grid} show= {this.state.show}/>
      <Sidebar onclick={this.checkClick.bind(this)}/>
      </div>
      </div>
      )
  }

}

export default Game;