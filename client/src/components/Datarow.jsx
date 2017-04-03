const React = require('react');
import Dataelement from '../components/Dataelement'
class Datarow extends React.Component{
constructor(options){
  super(options)
  this.state = {data:options.data, update: options.update}
  }



  render(){
    var options = this.props.data.map(function(clue,index){
      return <Dataelement value={index} key={index} solved={clue.solved} data={clue.number} update={this.state.update}/>
    }.bind(this))




    return(
      <div id='datarow'>
      {options}
     </div>
      )
  }

}

export default Datarow;
