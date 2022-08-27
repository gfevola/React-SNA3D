import React, {PureComponent } from "react";
import { Button } from 'antd';

class PeriodSelect extends PureComponent {

	render(){
		return(
		<div>
			<Button value = "Daily" onClick={this.props.period}>
				Daily
			</Button>
			
			<Button value = "Weekly" onClick={this.props.period}>
				Weekly
			</Button>
			
			<Button value = "Monthly" onClick={this.props.period}>
				Monthly
			</Button>			
		</div>
		)
	}
}
	
export default PeriodSelect;