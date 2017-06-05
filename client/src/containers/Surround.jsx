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
    var newState = {puzzles: puzzleList, current: null}
    this.setState(newState)
    }.bind(this))

  }

  clickButton(event){
    console.log(event.target.id)
  }

  render(){
    if (this.state){
    return(
      <div id='frame'>
        <div id= 'header'>Nonograms!</div>
        <div id='content'>
          <div id='left'> Left </div>
          <Game options={this.state.current}/>
          <div id='sidepanel'>
          <Status onbuttonclick={this.clickButton}/>
          <Sidebar data = {this.state.puzzles}/>
          <Controls onbuttonclick={this.clickButton}/>
          </div>

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
