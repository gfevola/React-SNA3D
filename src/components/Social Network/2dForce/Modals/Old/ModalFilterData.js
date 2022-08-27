import React, {Component} from 'react'
import { Button, Form, Input, Select } from 'antd';
import "./ModalCSS.css"

import SubList from "./SubList"

///data fields, filtering
class ModalFilterData extends Component {
	constructor(){
		super()
		
		this.state = {
			returnVal: "",
			list: []			
		}
		this.clicked = this.clicked.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.returnValueStack = this.returnValueStack.bind(this)
	}

	componentDidMount(){
		
		let field_array = dataFieldVals(this.props.data,this.props.fieldNames)
		this.setState({
			fieldlists: field_array
		})
		console.log(field_array);
	}

	clicked = (event) => {

		let field1 = event.currentTarget.value;
		let listdata = [];
		
		this.state.fieldlists.forEach(ls => {
			if (ls.name===field1){
				 listdata = ls.data
			}
		})
		
		this.setState({
			list: listdata
		})
		console.log(listdata)
	}
	
	handleSubmit = (event) => {
		console.log(event)
	}

	//selected values
	returnValueStack = (vals) => {
		console.log(vals)
	}

	render(){	

		return(
			<div>
				Select Field to Filter
				<div style={{'height':'5px'}}/>
				    <ul>
					 <Form onSubmit={this.handleSubmit} >
					 
					 {this.props.fieldNames.map((value, index) => {
						return <div key={index}>

								<Form.Item key = {index}>
									<Button className="FieldButton" onClick={this.clicked} value={value} idx={index}>{value}</Button>
								</Form.Item>
							   </div>
							   
						})
					  }
					  <SubList array={this.state.list} click1={this.returnValueStack}/>
					  </Form>
					</ul>
					

			</div>
			
		)
		
	}
};
export default ModalFilterData;


function dataFieldVals(data,fields){
	let multi_arry = [];
	let arry = [];
	
	fields.forEach(f => {
		data.forEach(d => {
			if (arry.indexOf(d[f])===-1){
				arry.push(d[f])
			}
		})
		multi_arry.push({'name':f, 'data':arry})
		arry = []
	})	
	
	return(multi_arry)
}