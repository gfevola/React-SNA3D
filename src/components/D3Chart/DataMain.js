import React, { Component } from "react";

import D3BarChart from "./D3BarChart"
import Sidebar from "./Sidebar"
import axios from "axios";
import AxiosDataClean from "../Axios/AxiosDataClean"
import "./elementbarCSS.css"
import {Button } from 'react-bootstrap'

import PivotArray from "../helper_functions/PivotArray"



	class DataMain extends Component {
		
		constructor(){
			super()
			this.state = {
				demoData: [],
				params: ["JobTitle","","Salary","Mean"],
				convertedData:[],
				elementList:[],
				aggTypes: ["Count","Sum","Mean"],
				buttonColors:[]
		
			}
		this.handleClick = this.handleClick.bind(this)
		this.MakeButton = this.MakeButton.bind(this)
		this.updateData = this.updateData.bind(this)
		}
		
      componentDidMount() {
        this.refreshList();
      }	
	  
	 ///api data request	
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/demo/reports")
          .then(res => {
			  let dd = AxiosDataClean(res.data,"Demo1",false);
			  this.setState({ 
					demoData: dd, 
					elementList: Object.keys(dd[0])
			  })
		  })
          .catch(err => console.log(err));
		  	 
      };

		//click events------------
		handleClick(name,pos){
			//event.persist(); //prevents synthetic event error

				if (pos===4){
					this.setState(prevState => ({
						params:[prevState.params[0],prevState.params[1],prevState.params[2],name],
					}))
				} else if (pos===2){			
					this.setState(prevState => ({
						params: [prevState.params[0],name,prevState.params[2],prevState.params[3]],
					}))
					this.updateData()
				} else {	
					this.setState(prevState => ({
						params: [name,prevState.params[1],prevState.params[2],prevState.params[3]],
					}))
					this.updateData()
				}
		}
	  //-----------------------	  

	//element button
	MakeButton(item,k_int,pos){
			return(
					<Button className="elementbarButton" tabIndex={k_int} >
						<div className="elementbarText" key={item} onClick={() =>this.handleClick(item,pos)}>
							{item}
						</div>
					</Button>
				)
	};
	
	//after element button changing variable
	updateData(){
		this.setState(prevState => ({
			convertedData: PivotArray(prevState.demoData,prevState.params[0],prevState.params[1],prevState.params[2])
		}))
	}
	
	////////////////////////
	////render function/////
	render(){
			let elementButtons1 = this.state.elementList.map((e,i) => {
				return(this.MakeButton(e,i,1))
			})
			let elementButtons2 = this.state.elementList.map((e,i) => {
				return(this.MakeButton(e,i,2))
			})
			let aggButtons = this.state.aggTypes.map((e,i) => {
				return(this.MakeButton(e,i,4))
			})			
			
			return (
				<div> 

					<Sidebar>
					
					</Sidebar>
					
					<div className="content-main">
						<h1 style={{color:"white"}}> {this.state.params[0]} x {this.state.params[3]} of {this.state.params[2]} </h1>
							{aggButtons}
						<D3BarChart idata={this.state.convertedData} pars={this.state.params} fillColor="#FFFFFF"/>
					 
					 <div className= "elementbar" id="ebar1">
						X Variables
						<br/>
						{elementButtons1}
					 </div>

					 <div className= "elementbar" id="ebar2">
						X2 Variables
						<br/>
						{elementButtons2}
					 </div>
					 
					</div>
					
				</div>
			)
		}
		
		
	}

   export default DataMain;