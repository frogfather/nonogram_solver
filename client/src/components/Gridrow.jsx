const React = require('react');
import Gridelement from '../components/Gridelement'
class Gridrow extends React.Component{

  constructor(props){
    super()
    this.state = {cells: props.cells}
  }
 

  render(){
    return(
      <div id='gridrow'>
      <Gridelement cell = {this.state.cells[0]}/>
      <Gridelement cell = {this.state.cells[1]}/>
      <Gridelement cell = {this.state.cells[0]}/>
      <Gridelement cell = {this.state.cells[1]}/>
      <Gridelement cell = {this.state.cells[0]}/>
      <Gridelement cell = {this.state.cells[1]}/>
      <Gridelement cell = {this.state.cells[0]}/>
      <Gridelement cell = {this.state.cells[1]}/>
      <Gridelement cell = {this.state.cells[0]}/>
      <Gridelement cell = {this.state.cells[1]}/>
      </div>
      )
  }

}

export default Gridrow;