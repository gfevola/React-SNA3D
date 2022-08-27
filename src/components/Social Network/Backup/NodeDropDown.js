import React, {Component } from "react";
import 'react-widgets/dist/css/react-widgets.css';
import "./dropdown.css"
import { DropdownList }from 'react-widgets';

let colors = ['orange', 'red', 'blue', 'purple'];

class NodeDropDown extends Component {
	constructor(){
		super()

	}
	


  render() {
    let { open } = this.state || {};
    let toggleWidget = () => this.setState({ open: !open });

    return (
      <div>

		  <DropdownList style={{color: "white"}}
			data={this.props.nodes}
			value = {this.props.value}
			onChange={this.props.onChangeValue}
		  />

      </div>
    )
  }	

}
export default NodeDropDown


