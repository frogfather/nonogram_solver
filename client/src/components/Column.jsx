const React = require('react');
import Datacol from '../components/Datacol'
class Column extends React.Component{

 

  render(){
    return(
      <div id='column'>
      <Datacol/>
      <Datacol/>
      <Datacol/>
      </div>
      )
  }

}

export default Column;