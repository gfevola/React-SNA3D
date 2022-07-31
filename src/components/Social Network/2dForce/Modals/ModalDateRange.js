import React, {Component} from 'react'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;


class ModalDate extends Component {
	
	render(){	
		return(
			<div>
				Select Date
				  <Space direction="vertical" size={12}>
						<RangePicker onChange={this.props.dateRange}/>
				  </Space>
			</div>
		)
		
	}
};

export default ModalDate;
