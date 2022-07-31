import React, { Component } from 'react'
import SearchFunction from "../Social Network/2dForce/SearchFunction"
import {Button } from 'antd'
import Loader from 'react-loader-spinner'

let loadDiv;

class EmpSearchBar extends Component {

	constructor(){
		super()
		
		this.state = {
			value: ""
		}
		
		this.item = this.item.bind(this)
		this.submitClick = this.submitClick.bind(this)
	}
	
	item = (val) => {
		this.setState({
			value: val
		})
	}
	
	submitClick = () => {

		this.props.selID(this.state.value)
	}		
	
	
	render(){
		let barStyling = {
			'height':100,
			'width':'100%', 
			'backgroundColor':'#e1e1e1',
			'marginLeft': '10px',
			'marginRight': '10px',
			'marginTop': '10px',
			'marginBottom': '10px'	
		}
		if (this.props.loading===true){
			loadDiv = <div><br/> <Loader style={{"position":"absolute"}}/> </div>
		} else {
			loadDiv = <div></div>
		}

		return(
			<div>
				<div id="EmpSearchBar" style={barStyling}>
					Select Employee:
					<br/>
					<SearchFunction nodes={this.props.EmpData} onChangeValue={this.item}/>
					
					<Button type="primary" style={{"position":"absolute"}} onClick={this.submitClick}>
						Submit
					</Button>
					
					{loadDiv}
					
				</div>
			</div>
		)
	}
	
};

export default EmpSearchBar;