import React, { PureComponent } from "react";
import {Nav, Button } from 'react-bootstrap'
import  "./elementbarCSS.css"

class Sidebar extends PureComponent {
	constructor(){
			super()
		this.state = {
			elementList: []
		}
		
	this.MakeButton = this.MakeButton.bind(this)
	this.btnClick = this.btnClick.bind(this)
	
	}

	btnClick(fieldName){
		console.log(fieldName);
		return(
			<div></div>
		)
	}

	MakeButton(item){
			return(
					<Button className="elementbarButton">
						<div className="elementbarText" key={item} onClick={() =>this.btnClick(item)}>
							{item}
						</div>
					</Button>
				)
	}
	
	render(){
		const eButtons = this.props.eList.map(e=> this.MakeButton(e))
		
		return(
		<div className="elementbar">
			<div>Elementbar Content</div>
			<Nav>
				{eButtons}
			</Nav>
		</div>
		)
	}
}

export default Sidebar