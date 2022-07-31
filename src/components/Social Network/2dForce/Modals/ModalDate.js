import React, {Component} from 'react'
import { DatePicker, Space } from 'antd';


class ModalDate extends Component {
	
	render(){	
		return(
			<div>
				Select Date
				  <Space direction="vertical" size={12}>
						<DatePicker onChange={this.props.date}/>
				  </Space>
			</div>
		)
		
	}
};

export default ModalDate;

