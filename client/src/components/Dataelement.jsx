const React = require('react');

class Dataelement extends React.Component{
  constructor(options){
    super(options)
    this.state={number:options.data, solved:options.solved}
    }



  render(){
    var divStyle;
    if (this.props.solved === -1){divStyle = {color: 'black', width: this.props.esize, height: this.props.esize}}
    else {divStyle = {color: 'red'}}
    return(
      <div id='dataelement' style={divStyle}>
      {this.state.number}
      </div>
      )
  }

}

export default Dataelement;
