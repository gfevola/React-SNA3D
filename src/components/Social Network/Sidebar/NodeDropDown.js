import React, {Component } from "react";
import 'react-widgets/dist/css/react-widgets.css';
import "./dropdown.css"
import { DropdownList }from 'react-widgets';

class NodeDropDown extends Component {

  render() {
    //let { open } = this.state || {};
	//let toggleWidget = () => this.setState({ open: !open });

    return (
      <div >
			Testvalue1
		  <DropdownList style={{height:300, color: "white", size:6}}
			data={this.props.nodes}
			textField="Name"
			key={n=> n.key}
			value = {this.props.value}
			onChange={this.props.onChangeValue}
			
		  />
			TestValue2
      </div>
    )
  }	

}
export default NodeDropDown


