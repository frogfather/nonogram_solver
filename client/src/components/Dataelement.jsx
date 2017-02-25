const React = require('react');

class Dataelement extends React.Component{
  constructor(options){
    super(options)
    this.state={number:options.data}
  }

  render(){
    return(
      <div id='dataelement'>
      {this.state.number}
      </div>
      )
  }

}

export default Dataelement;