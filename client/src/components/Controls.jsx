const React = require('react');

class Controls extends React.Component{

  constructor(props){
    super(props);
    this.state={onclick: this.props.onclick, onbuttonclick: this.props.onbuttonclick}
  }

  buttonClick(event){
    event.persist();
    console.log(event)
    this.state.onbuttonclick(event)
  }

  //sidebar should probably contain separate js objects for scrolling list and controls

  render(){
    var options = []
    for (var i = 0; i<= 50;i++){
      options.push({id: i, content: i*2})
    }
    return(
      <div id='controls'>
      <button type="button" onClick={this.buttonClick.bind(this)}>Click me!</button>
      </div>

      )
  }

}

export default Controls;
