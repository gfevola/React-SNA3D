import React, { useState, useEffect } from 'react'
import axios from "axios";
import AxiosGraphData from "../Axios/AxiosGraphData"
//import NeighborLinks from "../Social Network/NeighborLinks"
import "./EmpCSS.css"
import Loader from 'react-loader-spinner'

import EmpSearchBar from "./EmpSearchBar"
import PeriodSelect from "./PeriodSelect"
import D3LineChart from "../D3Chart/D3LineChart"
import PivotArray from "../helper_functions/PivotArray"
import AggregatebyTimePeriod from "../helper_functions/AggregatebyTimePeriod"

import MergeNodesandEmails from "./MergeNodesandEmails"
import UniqueList from "../helper_functions/UniqueList"

import {Button} from 'antd'

function EmpViewHooks() {

	const [loading, setLoading] = useState(true);
	const [EmpData, setEmpData] = useState([]);
	const [EmailData, setEmailData] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [selectEmp, setSelectEmp] = useState("");
	const [mergedData, setMergedData] = useState([]);
	
	useEffect(() => {
		axios
          .get("http://localhost:8000/api/employee")
          .then(res => {
				setEmpData(res.data)
				setLoading(false)
			})
          .catch(err => console.log(err));
		  console.log("useEffect")
	},[])

	function loadEmployeeData(){	
	
		let id = idFromString(selectEmp)

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
			setEmailData(res.data)
		})
        .catch(err => console.log(err));

	};
	
	function emailPeriod(val){
		//email timeframe is selected
		let tf = val.currentTarget.value
		let aggData = AggregatebyTimePeriod(EmailData,tf,"Sender")

		setChartData(PivotArray(aggData,"Date","","Sender"))

		setMergedData(MergeNodesandEmails(EmailData,EmpData))
		console.log(mergedData)
		let uniqueEmps=UniqueList(mergedData,"target")
		
		
		
	};
	
	function EmpLoader(){
		if (EmailData.length===0 & selectEmp!==""){
			return(<Loader color="#ab1F55" />)
		} else {
			return(<div></div>)
		}
	}
	
	/////////////////
	//rendering
	////////////////
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
						<Button onClick={loadEmployeeData}>Analyze</Button>
						<EmpSearchBar EmpData={EmpData} selID={setSelectEmp} loading={loading}/>
					</div>
					
					<EmpLoader />
					

					{/* Line Chart */}
					<div id="chart1">
						<PeriodSelect period={emailPeriod}/>
						<D3LineChart idata={chartData} pars={["Date","","Sender","Count"]} fillColor="#116688"/>
					</div>
					
				</div>
			)
	};
	
};

export default EmpViewHooks;


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