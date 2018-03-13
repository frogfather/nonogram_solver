const React = require('react');
import ajax from '../helpers/ajax'
import Puzzle from '../models/puzzle'
import Status from '../components/Status'
import Sidebar from '../components/Sidebar'
import Controls from '../components/Controls'
import Game from '../containers/Game'
import Gamedata from '../models/Gamedata'

class Surround extends React.Component{

  constructor(options){
    super(options)
    var puzzleOptions;
    var puzzleList = [];
    var puzzle;
    var url = "http://localhost:3000/api/puzzles" //find ip address? or hostname?
    ajax.get(url, function(data){
    if (data.length > 0){
      for (var item of data){
        console.log(item)
        puzzle = new Puzzle(item);
        puzzleList.push(puzzle)
        }
      }
    //var blankPuzzle = new Gamedata();
    //puzzleList.push(blankPuzzle)
    puzzleOptions = this.createNewPuzzleData(4,3,"Test Puzzle")
      console.log(puzzleOptions)
    var newState = {puzzles: puzzleList, current: null, show: 'user'}
    this.setState(newState)
    }.bind(this))

  }

  createNewPuzzleData(rowcount, colcount, name)
  {
    const dateTime = Date.now();
    const timeStamp = Math.floor(dateTime / 1000);
    var puzzleData;
    var cols = [];
    var rows = [];
    var gridRow = [];
    var grid = [];
    for (var colNo=1; colNo <= colcount; colNo++){
      cols.push([{colour: "black", solved: -1}])
    }
    for (var rowNo=1; rowNo<=rowcount; rowNo++){
      rows.push([{colour: "black", solved: -1}])
    }
    for (var colNo=1; colNo<= colcount; colNo++){
      gridRow.push({autovalue: "clear", cellcol: 0, cellrow: 0, lastchanged: {time: null, user: null}, show: "user",testcolour: "clear", testvalue1: -1, testvalue2: -1, usercolour: "clear"})
    }
    for (var rowNo=1; rowNo <= rowcount; rowNo++){
    grid.push(gridRow);  
    }
    puzzleData = {name:"test", timestamp: timeStamp,colours:[], cols: cols, rows: rows, grid: grid, lastchanged: {time: null, user:null}}
   
    return puzzleData
  }

  clickButton(event){
    var puzzleOptions
    console.log(event.target.id)
    console.log(this)
    if (event.target.id === "controlButton"){
      puzzleOptions = createNewPuzzleData(4,3,"Test Puzzle")
      console.log(puzzleOptions)
    }
    // if (event.target.id === "controlButton"){
    //   var url = "http://localhost:3000/api/puzzles"
    //   ajax.post(url, function(data){
    //     console.log("in post callback")
    //     console.log(data)
    //   },this.state)  
    // }


  }

  
  clickPuzzleList(event){
    if (event.target.id === "sidebar"){
  } else {
    if (event.target.innerHTML != "New puzzle"){
      //find the puzzle and make it the current one
      var myPuzzle = this.findPuzzle(event.target.innerHTML)
      this.setState({current: myPuzzle})
    } else {
      this.setState({current: null})
      console.log("new puzzle coming up!")
      //we want to ask the user for the puzzle size
      //create a new puzzle by new Puzzle (options) where options is the information about the new puzzle
      //lets make a new game
      
    }
    
  }

  }

  findPuzzle(name){
    for (var puzzle of this.state.puzzles){
      if (puzzle.name === name){
        return puzzle
       }
      }
  }

  render(){
    if (this.state){
    return(
      <div id='frame'>
        <div id= 'header'>Nonograms!</div>
        <div id='content'>

          <div id='sidepanel'>
          <Status onbuttonclick={this.clickButton}/>
          <Sidebar data = {this.state.puzzles} onlistclick = {this.clickPuzzleList.bind(this)} />
          <Controls onbuttonclick={this.clickButton}/>
          </div>
          <Game options={this.state}/>

        </div>
        <div id='footer'>This is the footer</div>
      </div>
    )}
    else {
      return(
        <div id='frame'>
          <div id='content'>
          </div>
          <div id='sidepanel'>
          </div>
        </div>
      )
    }
  }

}

export default Surround;
