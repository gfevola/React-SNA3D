import React, { Component } from "react";
import axios from "axios";
//import {Form, Button} from 'react-bootstrap'

class CustomForm1 extends Component {
	constructor(){
		super()
		this.state = {
			repname: [],
			colname: [],
			fieldtype: [],
			
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onRepChange = this.onRepChange.bind(this);
		this.onColChange = this.onColChange.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}
	
	onRepChange(event){
			this.setState({
				repname: event.target.value
			})
	}
	
	onColChange(event){
			this.setState({
				colname: event.target.value
			})
	}
	onFieldChange(event){
			this.setState({
				fieldtype: event.target.value
			})
	}
	
	
	
	handleFormSubmit(event){
		
		event.preventDefault()
		
		const ReportName = this.state.reportname;
		const ColumnName = this.state.colname;
		const FieldType = this.state.fieldtype;
		
		axios.post("http://127.0.0.1:8000/apu/todos/",{
					ReportName: ReportName,
					ColumnName: ColumnName,
					FieldType: FieldType
				})	
				.then(res => console.log(res))
				.catch(err =>

				console.error(err.response.data)
				);
				
		
		

	};
	
	render(){

		return(
			<div>

				<form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label>Add Report Name</label>
                        <input type="text" value={this.state.reportname} onChange={this.onRepChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Column Name</label>
                        <input type="text" value={this.state.columnname} onChange={this.onColChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Field Type</label>
                        <input type="text" value={this.state.fieldtype} onChange={this.onFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
						<input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
			</div>
		)
		
	}
	
}

export default CustomForm1;

