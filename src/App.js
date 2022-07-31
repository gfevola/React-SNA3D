import React, { Component } from "react";
import DataMain from "./components/D3Chart/DataMain"
import NavbarX from "./components/styling/NavbarX"
import Home from "./components/Home"
import Table from "./components/Table"
import Employee from "./components/Employee/EmpView"
import EmployeeHooks from "./components/Employee/EmpViewHooks"
import Force3d from "./components/Social Network/Views/Force3d"
import JobDescView from "./components/Social Network/Views/JobDescView"
import SNAFixed from "./components/Social Network/Views/SNAFixed"
import SNABase from "./components/Social Network/SNABase"
import Test from "./components/Test"
import Bar3D from "./components/Three/Bar3D"
import FractalTHREE from "./components/Three/Testing/FractalTHREE"
import SkyBoxIntro from "./components/Three/Testing/SkyBoxIntro"
import CloudBackground from "./components/Three/Testing/CloudBackground"
import ShaderTest from "./components/Three/Testing/ShaderTest"
import D3Chord from "./components/D3Chart/D3Chord"
import ParticleFlow from "./components/Three/ParticleFlow"
import ForceNodes from "./components/Three/Testing/ForceNodes"

import {BrowserRouter, Switch, Route} from "react-router-dom"

class App extends Component {
		
	////////////////////////
	////render function/////
	render(){
			
			return (
				<BrowserRouter>
				
					<div> 
						<NavbarX />
					</div>
					
					
					<Switch>
						<Route path="/home">
							<Home />
						</Route>
						<Route path="/table">
							<Table />
						</Route>
						<Route path="/chart">
							<DataMain />
						</Route>						
						<Route path="/employee">
							<Employee />
						</Route>	
						<Route path="/samplenet">
							<Force3d />
						</Route>	
						<Route path="/vr">
							<JobDescView />
						</Route>	
						<Route path="/working">
							<SNAFixed />
						</Route>	
						<Route path="/sna">
							<SNABase type="view2d"/>
						</Route>			
						<Route path="/sna3d">
							<SNABase type="view3d" />
						</Route>
						<Route path="/bar3d">
							<Bar3D />
						</Route>	
						<Route path="/fractal">
							<FractalTHREE />
						</Route>
						<Route path="/intro">
							<SkyBoxIntro />
						</Route>	
						<Route path="/Test">
							<Test />
						</Route>	
						<Route path="/cloud">
							<CloudBackground />
						</Route>						
						<Route path="/chord">
							<D3Chord />
						</Route>	
						<Route path="/flow">
							<ParticleFlow />
						</Route>	
						<Route path="/emphooks">
							<EmployeeHooks />
						</Route>							
						<Route path="/shader">
							<ShaderTest />
						</Route>							
						<Route path="/ForceNodes">
							<ForceNodes />
						</Route>	
					</Switch>
					
					
				</BrowserRouter>
			)
		}
		
		
	}

   export default App;