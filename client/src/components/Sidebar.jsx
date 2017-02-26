const React = require('react');
class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.state={onclick: this.props.onclick}
  }

  checkboxClick(event){
    event.persist()
    console.log(event.target.checked);
    this.state.onclick(event)
  }

  render(){
    return(
      <div id='sidebar'>
      <label><input type="checkbox" id="cbox1" value="crosscheckbox" onClick={this.checkboxClick.bind(this)}/>cross</label>
      </div>
      )
  }

}

export default Sidebar;