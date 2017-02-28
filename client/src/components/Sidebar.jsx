const React = require('react');
class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.state={onclick: this.props.onclick, onbuttonclick: this.props.onbutton}
  }

  checkboxClick(event){
    event.persist()
    this.state.onclick(event)
  }

  buttonClick(event){
    event.persist()
    this.state.onbuttonclick(event)
  }

  render(){
    return(
      <div id='sidebar'>
      <label><input type="checkbox" id="ckcross" value="crosscheckbox" onClick={this.checkboxClick.bind(this)}/>cross</label>
      <label><input type="checkbox" id="ckauto" value="autocheckbox" onClick={this.checkboxClick.bind(this)}/>auto</label>
      <button type="button" onClick={this.buttonClick.bind(this)}>Click me!</button>
      </div>
      )
  }

}

export default Sidebar;