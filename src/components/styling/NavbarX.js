import React, { PureComponent } from "react";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

class NavbarX extends PureComponent {
	
	render(){
		return(
		
				<Navbar bg="dark" variant="dark" expand="lg">
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
						  <Nav.Link href="/home">Home</Nav.Link>
						  <Nav.Link href="/table">Table</Nav.Link>
						  <Nav.Link href="/chart">Chart</Nav.Link>
						  <Nav.Link href="/employee">Employee</Nav.Link>
						  <Nav.Link href="/samplenet">Sample SNA</Nav.Link>
						  <Nav.Link href="/vr">THREE</Nav.Link>
						  <Nav.Link href="/working">Working-THREE</Nav.Link>
						  <Nav.Link href="/sna">SNA</Nav.Link>
						  <Nav.Link href="/sna3d">Particles</Nav.Link>
						  <Nav.Link href="/chord">Chord</Nav.Link>

						 
						 <NavDropdown title="THREE Development" id="basic-nav-dropdown">
							<NavDropdown.Item href="/test"> Test </NavDropdown.Item>
							<NavDropdown.Item href="/intro"> Sphere Intro </NavDropdown.Item>
							<NavDropdown.Item href="/bar3d"> 3dBar </NavDropdown.Item>
							<NavDropdown.Item href="/fractal"> Fractal </NavDropdown.Item>
							<NavDropdown.Item href="/flow"> Particle Flow </NavDropdown.Item>
							<NavDropdown.Item href="/shader"> Shader Test </NavDropdown.Item>
							<NavDropdown.Item href="/ForceNodes"> ForceNodes </NavDropdown.Item>
							<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						  </NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
		
		
		)
	}
}

export default NavbarX