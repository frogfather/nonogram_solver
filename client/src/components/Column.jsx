const React = require('react');
import Datacol from '../components/Datacol'
class Column extends React.Component{

constructor(options){
super(options)
this.state = {data: options.coldata}
}


  render(){
    const divStyle = {
        marginLeft: this.props.lmargin}

    var options = this.state.data.map(function(coldata,index){
      return <Datacol value={index} key={index} data={coldata} esize={this.props.esize}/>
    }.bind(this))
    return(
      <div id='column' style={divStyle}>
      {options}
      </div>
      )
  }

}

export default Column;
