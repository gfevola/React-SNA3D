import React, {Component} from 'react'
import {SwatchesPicker} from 'react-color'

//import { Layout, Menu, Modal } from 'antd';
//import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

//const { SubMenu } = Menu;
//const { Content, Sider } = Layout;


class ModalColor extends Component {
	constructor(){
		super()
		
		this.state = {color: "" }

	}
	
	
	render(){	

		return(
			<div>
				Select Link Color
				<SwatchesPicker onChangeComplete={ this.props.onColorPick }/>
			</div>
		)
		
	}
};

export default ModalColor;