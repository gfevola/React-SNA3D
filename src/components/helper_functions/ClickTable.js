import React, { Component } from "react";
import { Button } from 'react-bootstrap'

import CustomForm1 from './CustomForm1'

class ClickTable extends Component {
	constructor(){
		super()
		this.state = {
			table1:[]
		}
		
	this.changeFunction = this.changeFunction.bind(this)
	
	}
	
	
	changeFunction(){

	}
	
		render(){
			
		 return (
			<div>
			<table className="table table-bordered">
				<thead>
					<tr style={{color:"white"}}>
						<th>Column A</th>
						<th>Column B</th>
					</tr>
				</thead>
				<tbody>
					{this.props.tableData.map((row, index) => {
						return (
							<tr key={index}>
								<td><input type='text' className='form-control' defaultValue={row.ColumnName} onChange={this.changeFunction(this)}/></td>
								<td><input type='text' className='form-control' defaultValue={""} onChange={this.changeFunction(this)}/></td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<Button type="primary" htmltype="submit">Submit </Button>
			<CustomForm1 />
			</div>
		  );
		};
};
export default ClickTable