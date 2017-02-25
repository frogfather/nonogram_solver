const React = require('react');
import Gridrow from '../components/Gridrow'
import Cells from '../models/Cells'

class Grid extends React.Component{

  constructor(){
    super()

    var testCells = new Cells();
    this.state = {cells: testCells}
  }

 

  render(){
    return(
      <div id='grid'>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      <Gridrow cells= {this.state.cells}/>
      </div>
      )
  }

}

export default Grid;