import React, { Component } from "react";
import AntSider from "./AntSider";
import 'antd/dist/antd.css';


class AntDashboard extends Component {
		
		render(){
		return(
			<div>
				<AntSider />
				<div style={{height:700, width: 700}}></div>
			</div>
		)
	}
}
export default AntDashboard
