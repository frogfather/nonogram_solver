const React = require('react');
class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.state={onclick: this.props.onclick}
  }

  checkboxClick(event){
    event.persist()
    this.state.onclick(event)
  }

  render(){
    return(
      <div id='sidebar'>
      <label><input type="checkbox" id="ckcross" value="crosscheckbox" onClick={this.checkboxClick.bind(this)}/>cross</label>
      <label><input type="checkbox" id="ckauto" value="autocheckbox" onClick={this.checkboxClick.bind(this)}/>auto</label>
      </div>
      )
  }

}

export default Sidebar;