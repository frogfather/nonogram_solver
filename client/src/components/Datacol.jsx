const React = require('react');
import Dataelement from '../components/Dataelement'
class Datacol extends React.Component{
  constructor(options) {
    super(options)
    this.state={data:options.data}
  }


  render(){

    var options = this.state.data.map(function(clue,index){
      return <Dataelement value={index} key={index} solved ={clue.solved} data={clue.number} esize={this.props.esize}/>
    }.bind(this))



    return(
      <div id='datacol'>
      {options}
      </div>
      )
  }

}

export default Datacol;
