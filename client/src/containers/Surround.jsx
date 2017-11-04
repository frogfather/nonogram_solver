const React = require('react');
import ajax from '../helpers/ajax'
import Puzzle from '../models/puzzle'
import Status from '../components/Status'
import Sidebar from '../components/Sidebar'
import Controls from '../components/Controls'
import Game from '../containers/Game'

class Surround extends React.Component{

  constructor(options){
    super(options)
    var puzzleList = [];
    var puzzle;
    var url = "http://localhost:3000/api/puzzles"
    ajax.get(url, function(data){
    if (data.length > 0){
      for (var item of data){
        puzzle = new Puzzle(item);
        puzzleList.push(puzzle)
        }
      }
    var newState = {puzzles: puzzleList, current: null, show: 'user'}
    this.setState(newState)
    }.bind(this))

  }

  clickButton(event){
    console.log(event.target.id)
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
      console.log("rendering surround")
      console.log("current game is "+ this.state.current)
      console.log(this.state)
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
