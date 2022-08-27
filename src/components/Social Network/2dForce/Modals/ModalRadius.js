import React, {Component} from 'react'
import { Button } from 'antd';
import "./ModalCSS.css"

class ModalFieldSelect extends Component {
	constructor(){
		super()
		
		this.state = {
			returnVal: 0 
		}

	}


	
	render(){	

		return(
			<div>
				Apply Radius to Selected Node
				<div style={{'height':'5px'}}/>
				    <ul>
						<Button className="RadiusButton" key={1} value={true} onClick={this.props.onToggle}>
							Turn On
						</Button>	
					</ul>
				    <ul>
						<Button className="RadiusButton" key={2} value={false} onClick={this.props.onToggle}>
							Turn Off
						</Button>	
					</ul>
					<div>
						<label>Radius</label>
						<input type="number" defaultValue={10} onChange={(e) => { this.props.radius(e.target.value) }}></input>
					</div>
			</div>
			
		)
		
	}
};

export default ModalFieldSelect;