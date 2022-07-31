import React, {Component} from 'react'
import { Button } from 'antd';
import "./ModalCSS.css"

class ModalFieldSelect extends Component {
	constructor(){
		super()
		
		this.state = {
			returnVal: "" 
		}
		this.clicked = this.clicked.bind(this)
	}

	clicked = (click,event) => {
		console.log(click)
		console.log(event)
		
	}
	
	render(){	

		return(
			<div>
				Select Field to Color
				<div style={{'height':'5px'}}/>
				    <ul>
					  {this.props.fieldNames.map((value, index) => {
						return <div key={index}>
									<Button key={index} className="FieldButton" value={value} onClick={this.props.onFieldPick}>
										{value}
									</Button>	
							   </div>
					  })}
					</ul>

			</div>
			
		)
		
	}
};

export default ModalFieldSelect;