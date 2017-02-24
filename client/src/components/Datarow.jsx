const React = require('react');
import Dataelement from '../components/Dataelement'
class Datarow extends React.Component{

 

  render(){
    return(
      <div id='datarow'>
      <Dataelement/>
      <Dataelement/>
      <Dataelement/>
      </div>
      )
  }

}

export default Datarow;