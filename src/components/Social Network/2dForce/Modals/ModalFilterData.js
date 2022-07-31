import React, {Component} from 'react'
import { Button, Form, Select } from 'antd';
import "./ModalCSS.css"

const { Option } = Select



///data fields, filtering
class ModalFilterData extends Component {
	constructor(){
		super()
		
		this.state = {
			returnVal: "",
			list: [],
			fieldlists:[],			
		}
		this.clicked = this.clicked.bind(this)
		this.onFinish = this.onFinish.bind(this)
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
	}

	onFinish = (event) => {
		this.props.onSubmit(datarray)
	}


	render(){	
		
		return(
			<div>
				Select Field to Filter
				<div style={{'height':'5px'}}/>
					<ul>
					<Form onFinish={this.onFinish}>
						
						{/* data function */}
						<LoadedData data={this.state.fieldlists} props={this.props}/>
						<Button type="primary" htmlType="submit"> Submit </Button>
					</Form>
					</ul>
			</div>
			
		)
		
	}
};
export default ModalFilterData;

let datarray = []

function formClick(click){
	let fieldInt = click.currentTarget.attributes.value.value
	let val = click.target.textContent
	if (val!=="Please select"){
		datarray.push({"fieldNum":fieldInt,"value":val})
		console.log(datarray)
	}
}

function LoadedData(data,props){
	let data1 = data.data

	if (data1.length>0){

		return(
		
		    <div>
			 {data1.map((values,idx) => {
				return (
						<div key={idx}>
						<div key={values.name+ "div"}>{values.name }</div>
						<Form.Item key={values.name+ "itm"} onClick={formClick} value={idx}>
						<Select
							mode="tags"
							placeholder="Please select"
							style={{ width: '100%' }}
							key = {values.name+"selector"}
						  >

							{values.data.map((ar,index) => { 
								return(
								<Option value={ar} label={ar} key={values.name + index}>
									{ar}
								</Option>
								)
							})}
							
						</Select>
						</Form.Item>
						</div>
					)
				})
			  }
			</div>
			
			) //return
	} else {
		
		return (<div></div>)
	
	}		
}

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