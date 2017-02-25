const React = require('react');
import Datacol from '../components/Datacol'
class Column extends React.Component{

constructor(options){
super(options)
this.state = {data: options.coldata}
}
 

  render(){
    var options = this.state.data.map(function(coldata,index){
      return <Datacol value={index} key={index} data={coldata}/>
    }.bind(this))
    
    return(
      <div id='column'>
      {options}
      </div>
      )
  }

}

export default Column;