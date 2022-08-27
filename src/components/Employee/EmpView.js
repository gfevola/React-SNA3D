import React, { Component } from 'react'
import axios from "axios";
import AxiosGraphData from "../Axios/AxiosGraphData"
//import NeighborLinks from "../Social Network/NeighborLinks"
import "./EmpCSS.css"
import Loader from 'react-loader-spinner'

import ProfilePic from "./ProfilePic"
import EmpSearchBar from "./EmpSearchBar"
import PeriodSelect from "./PeriodSelect"
//import ParseEmails from "./ParseEmails"
//import SearchFunction from "../Social Network/2dForce/SearchFunction"

//import D3BarChart from "../D3Chart/D3BarChart"
import D3LineChart from "../D3Chart/D3LineChart"
import PivotArray from "../helper_functions/PivotArray"
import AggregatebyTimePeriod from "../helper_functions/AggregatebyTimePeriod"
import D3ForceNet from "../Social Network/2dForce/D3ForceNet"
import D3Sankey from "../D3Chart/D3Sankey"

import MergeNodesandEmails from "./MergeNodesandEmails"
import UniqueList from "../helper_functions/UniqueList"

import {Button} from 'antd'

let loading = true;
let empLoading = false;
let testing = [];

class EmpView extends Component {

	constructor(){
		super()
		this.state = {
			EmpID :"",
			FullEmpData:[],
			FullEmailData:[],
			FullGraphData:[],
			EmailData:[],
			GraphData:[],
			chartData:[],
			XEmailData:[]
		}

		this.importEmpData = this.importEmpData.bind(this)
		this.importGraphData = this.importGraphData.bind(this)
		this.selectEmp = this.selectEmp.bind(this)
		this.loadComplete = this.loadComplete.bind(this)
		this.emailPeriod = this.emailPeriod.bind(this)
		this.filterEmployeeData = this.filterEmployeeData.bind(this)
		this.loadEmployeeData = this.loadEmployeeData.bind(this)
		this.relatedEmployees = this.relatedEmployees.bind(this)
	}

	componentDidMount(){

		this.importEmpData()
		this.importGraphData()
		
	}	

	importEmpData(){
		axios
          .get("http://localhost:8000/api/employee")
          .then(res => {
			this.setState({FullEmpData: res.data });
		  })
          .catch(err => console.log(err));
		  
	}

	loadEmployeeData(id){	

		empLoading = true	

		axios({
			"method":"GET",
			"url":"http://localhost:8000/sna/emaildata",
			"headers":{
				'Accept':'application/json',
				'Content-Type': 'application/json',
			},
			"params":{
				"testing":id
			},
		})
		.then(res => {
			this.setState({FullEmailData: res.data })
		  })
        .catch(err => console.log(err));
			
	}

	importGraphData(){
		axios
          .get("http://localhost:8000/sna/network")
          .then(res => {
			let dd = AxiosGraphData(res.data,"sample2",false);  
			this.setState({FullGraphData: dd[0] });
		  })
          .catch(err => console.log(err));
	}
	
	selectEmp = (val) => {
		this.setState({ EmpID: idFromString(val) })	
		this.loadEmployeeData(idFromString(val))
	}
	
	
	emailPeriod = (val) => {
		
		let tf = val.currentTarget.value
		let aggData = AggregatebyTimePeriod(this.state.EmailData,tf,"Sender")

		this.setState({
			chartData:PivotArray(aggData,"Date","","Sender")
		})
	}
	
	filterEmployeeData = () => {
		
		let arr = [];
		
		//emails duplicated b/w sender/recipient
		this.state.FullEmailData.forEach((email) => {
			if(email.Sender===this.state.EmpID){
				arr.push(email);
			}
		})

		this.setState({
			EmailData:arr,
		})	

		testing = MergeNodesandEmails(this.state.FullEmailData,this.state.FullEmpData)
		
		this.relatedEmployees()
		
	}
	
	relatedEmployees = () => {

		let uniqueEmps=UniqueList(testing,"target")
		let neighborData = []
		//uniqueEmps.forEach(emp => {
			neighborData.push(this.loadEmployeeData(uniqueEmps[1]))
		//})
		console.log(neighborData)
	}
	
	renderForceNet = () => {
		
		return(<D3ForceNet 
				nodes={this.state.GraphData.nodes} 
				links={this.props.GraphData.links} 
				selectedID={this.state.selected}
				lastClicked="selectNode"
				linkColor="#12217a"
				nodeColor="000000"
				toggleLabels="On"
				nodeCategory=""
				sphereOn="false"
				sphereRad="0"
			/>)	
	}
	
	//rendering
	componentDidUpdate(){
		if(this.state.FullEmpData.length>0){
			this.loadComplete()
		}
		
		if (this.state.FullEmailData.length>0){
			empLoading = false
		}
	}
	
	loadComplete = () => {
		loading =  false
	}
	
	render(){
		
		if(loading){
			return(
				<div>
					<Loader color="#00BFFF" />
					   <div style={{marginLeft:"10px" }}> Loading... </div>
				</div>	
			)
		}
		else {
			return(
				<div id="wrapper">
					{/* Search Bar */}
					<div id="header1">
						<Button onClick={this.filterEmployeeData}> Analyze </Button>
						<EmpSearchBar EmpData={this.state.FullEmpData} selID={this.selectEmp} loading={empLoading}/>
					</div>
					
					{/* Profile Pic */}
					<div id="profile1">					
						<ProfilePic />
					</div>
					
					{/* Line Chart */}
					<div id="chart1">
						<PeriodSelect period={this.emailPeriod}/>
						<D3LineChart idata={this.state.chartData} pars={["Date","","Sender","Count"]} fillColor="#116688"/>
					</div>
					
					{/* Sankey/Alluvial */}
					<div id="chart2">
						<D3Sankey idata={this.state.FullGraphData} />
					</div>

					<div id="network1">
					
					</div>
				</div>
			)
		}
	}
	
};

export default EmpView;


function idFromString(str){
	let begInd;
	let endInd;
	let j;
	for (var i = 0; i <= str.length; i++) {
		j = str.length - i
	   if(str[j]===")"){
		   endInd = j;
	   } else if(str[j]==="("){
		   begInd=j;   
	   }
	   if (endInd>0 & begInd>0){
		   i = str.length //end loop
	   }
	 }
	 
	let returnval = str.substr(begInd+1,endInd - begInd - 1)

	return(returnval)
}