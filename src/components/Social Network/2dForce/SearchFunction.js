import { AutoComplete } from 'antd';
//import { UserOutlined } from '@ant-design/icons';
import React, {Component} from 'react'

class Complete extends Component {
	constructor(){
		super()
		
		this.renderItem = this.renderItem.bind(this)
	}
	
	renderItem(nodeList){
		var returnArr = [];
		nodeList.forEach((nd) => {
			returnArr.push({id: nd.EmpID, value: nd.Name + " (" + nd.EmpID + ")"})
		})
		return(returnArr)
	}

  render(){ 
	
	  return(
		  <AutoComplete
			style={{ width: 200 }}
			options={this.renderItem(this.props.nodes)}
			placeholder="Node List"
			filterOption={(inputValue, option) =>
				option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
			}
			onChange={this.props.onChangeValue}
		  />
	  )
  }
};

export default Complete





