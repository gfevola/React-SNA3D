import React, {Component } from "react";
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class AntMenuItems extends Component {
	
	constructor(){
		super()
		
		this.handleMenuClick = this.handleMenuClick.bind(this);	
	}
	
	handleMenuClick = (e) => {
		console.log(e.key)
	}
	
	render(){
	return(
		  <Menu onClick={this.handleMenuClick}>
			<Menu.Item key="1" icon={<UserOutlined />}>
			  1st menu item
			</Menu.Item>
			<Menu.Item key="2" icon={<UserOutlined />}>
			  2nd menu item
			</Menu.Item>
			<Menu.Item key="3" icon={<UserOutlined />}>
			  3rd menu item
			</Menu.Item>
		  </Menu>
		  )
  }
}
export default AntMenuItems;