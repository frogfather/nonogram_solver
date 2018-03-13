const React = require('react');
import Gridrow from '../components/Gridrow'

class Grid extends React.Component{

  constructor(options){
    super(options)
    this.state = {rows: options.griddata, onclick: this.props.onclick, show: this.props.show}
  }



  render(){
    var options = this.state.rows.map(function(row,index){
      return <Gridrow onclick={this.state.onclick} value={index} key={index} data={row} esize={this.props.esize}/>
    }.bind(this))

    return(
      <div id='grid'>
      {options}
      </div>
      )
  }

}

export default Grid;
