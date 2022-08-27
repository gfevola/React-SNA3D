import React, {Component} from 'react'
import { Table } from 'antd';
import NeighborLinks from "./NeighborLinks"
import "./Sidebar/sideTable.css"

import PivotArray from "../helper_functions/PivotArray"

const columns = [
  {
    title: 'Dept',
    dataIndex: 'Value',
    key: 'Value',
  },
  {
    title: 'Count',
    dataIndex: 'Count',
    key: 'Count',
  },
];


let part1;
let part2;

class NeighborTable extends Component {
	
	constructor(){
		super()
		
		this.state = {
			tabledata: []
		}
		this.NeighborList = this.NeighborList.bind(this)
	}
	
	
	NeighborList = () => {
		//get list of neighbors by depth d, set to state
		if(this.props.selected.length>0){
			
			part1 = NeighborLinks(this.props.selected[0],this.props.data,3,true)[0]
			part2 = PivotArray(part1,"DeptSource","","Count")

		}		
	}

	componentDidMount(){
		this.NeighborList()
	}

	render(){

		return(
				<Table 
					columns={columns} 
					dataSource={part2}
					pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5','10', '20', '30']}}

				/>
		)
	}
}
export default NeighborTable