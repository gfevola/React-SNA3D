import React, {Component} from 'react'
import {Button} from 'react-bootstrap'


class ModalBoolean extends Component {
	constructor(props){
		super(props)
		
		this.state = {displayYN: props.defaults, displayAlt: props.defaultTag}
	}
	
	
	render(){	
		return(
			<div>
				Toggle Labels
				<br />
				<Button id="TurnOn" value={"On"} onClick={this.props.labelsOn} style={buttonStyle}>
					On
				</Button>
				<Button id="TurnOff" value={"Off"} onClick={this.props.labelsOn} style={buttonStyle}>
					Off
				</Button>
			</div>
		)
		
	}
};

export default ModalBoolean;

const buttonStyle = {
	backgroundColor: "#F2F2F2",
	color: "black",
	margin: "5px"
}