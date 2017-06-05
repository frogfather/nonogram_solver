const React = require('react');

class Status extends React.Component{

  constructor(props){
    super(props);
    this.state={onbuttonclick: this.props.onbuttonclick}
  }

  buttonClick(event){
    event.persist();
    this.state.onbuttonclick(event)
  }

  render(){
    return(
      <div id='status'>
      <button type="button" id="statusButton" onClick={this.buttonClick.bind(this)}>Hello!</button>
      </div>
      )
  }

}

export default Status;
