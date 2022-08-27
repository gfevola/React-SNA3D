import React, { PureComponent } from "react";
import {Nav, Button } from 'react-bootstrap'
import  "./sidebarCSS.css"


class Sidebar extends PureComponent {
	
	render(){
		return(
		<div className="sidebar">
			<div>Sidebar Content</div>
			<Nav>
				<Button className="sidebarContainer">
					<Nav.Link href="#link1">
						<div className="sidebarText"><span>First Link</span></div>
					</Nav.Link>
				</Button>
				
				<Button className="sidebarContainer">
					<Nav.Link href="#link2">
						<div className="sidebarText">Second Link</div>
					</Nav.Link>
				</Button>
				
			</Nav>
		</div>
		)
	}
}

export default Sidebar