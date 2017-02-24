const React = require('react');
import Dataelement from '../components/Dataelement'  
class Datacol extends React.Component{

 

  render(){
    return(
      <div id='datacol'>
      <Dataelement/>
      <Dataelement/>
      <Dataelement/>
      </div>
      )
  }

}

export default Datacol;