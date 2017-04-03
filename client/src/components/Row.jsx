const React = require('react');
import Datarow from '../components/Datarow'
class Row extends React.Component{

  constructor(options){
  super(options)
  this.state = {data: options.rowdata, update: options.rupdate}
  }

  
  render(){

    var options = this.props.rowdata.map(function(rowdata,index){
      return <Datarow value={index} key={index} data={rowdata} update={this.state.update}/>
    }.bind(this))

    return(
      <div id='row'>
      {options}
      </div>
      )
  }

}

export default Row;
