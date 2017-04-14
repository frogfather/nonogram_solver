const React = require('react');
import Dataelement from '../components/Dataelement'
class Datarow extends React.Component{
constructor(options){
  super(options)
  this.state = {data:options.data}
  }



  render(){
    var options = this.props.data.map(function(clue,index){
      return <Dataelement value={index} key={index} solved={clue.solved} data={clue.number}/>
    }.bind(this))




    return(
      <div id='datarow'>
      {options}
     </div>
      )
  }

}

export default Datarow;
