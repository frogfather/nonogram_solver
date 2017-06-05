const React = require('react');

class Controls extends React.Component{

  constructor(props){
    super(props);
    this.state={onbuttonclick: this.props.onbuttonclick}
  }

  buttonClick(event){
    event.persist();
    this.state.onbuttonclick(event)
  }


  render(){
    var options = []
    for (var i = 0; i<= 50;i++){
      options.push({id: i, content: i*2})
    }
    return(
      <div id='controls'>
      <button type="button" id="controlButton" onClick={this.buttonClick.bind(this)}>Click me!</button>
      </div>

      )
  }

}

export default Controls;
