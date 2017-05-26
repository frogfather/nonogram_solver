const React = require('react');
import ReactScrollableList from '../../node_modules/react-scrollable-list/dist/index'

class Sidebar extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    var options = []
    for (var i = 0; i<= 50;i++){
      options.push({id: i, content: i*2})
    }
    return(
      <div id='sidebar'>
      <ReactScrollableList listItems={options} heightOfItem={10} maxItemsToRender={30}/>
      </div>
      )
  }

}

export default Sidebar;
