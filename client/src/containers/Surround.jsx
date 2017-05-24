const React = require('react');
import ajax from '../helpers/ajax'
import Puzzle from '../models/puzzle'
import Sidebar from '../components/Sidebar'

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
    var newState = {puzzles: puzzleList}
    this.setState(newState)
    }.bind(this))

  }

  clickButton(event){
    console.log(event)

  }

  render(){
    if (this.state){
    return(
      <div id='frame'>
      <div id='content'>
      </div>
      <Sidebar data = {this.state.puzzles} onbuttonclick={this.clickButton}/>
      </div>
    )}
    else {
      return(
        <div id='frame'>
        <div id='content'>
        </div>
        </div>
      )
    }
  }

}

export default Surround;
