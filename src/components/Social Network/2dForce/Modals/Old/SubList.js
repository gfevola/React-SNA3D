import React, {Component} from 'react'
import { Button, Form, Input, Select, Radio } from 'antd';
import "./ModalCSS.css"

const {Option} = Select

class SubList extends Component {
	constructor(){
		super()
		
		this.state = {
			returnVal: "" 
		}
		this.clicked = this.clicked.bind(this)
	}

	clicked = (e) => {
		console.log(e)
	}


	render(){	
		console.log(this.props)
		return(
			<div>
				  <Select
					mode="tags"
					placeholder="Please select"
					onChange={this.props.click1}
					style={{ width: '100%' }}
				  >
				  
				  {this.props.array.map((ar,index) => {
							return (
								<Option value={ar} label={ar} key={index}>
									{ar}
								</Option>
							)
						})
				  }
				  
	
				</Select>
			</div>
			
		)
		
	}
};

export default SubList;