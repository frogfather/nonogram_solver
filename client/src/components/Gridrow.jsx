const React = require('react');
import Gridelement from '../components/Gridelement'
class Gridrow extends React.Component{

  constructor(props){
    super(props)
    this.state = {row: props.data, onclick: props.onclick, rowno: props.value}
  }
 

  render(){
    var options = this.state.row.map(function(cell,index){
      return <Gridelement onclick= {this.state.onclick} rowno={this.state.rowno} value={index} key={index} data={cell}/>
    }.bind(this))
    


    return(
      <div id='gridrow'>
      {options}
      </div>
      )
  }

}

export default Gridrow;