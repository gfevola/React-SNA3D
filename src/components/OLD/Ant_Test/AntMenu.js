import React, {Component } from "react";
import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { AntMenuItems } from "./AntMenuItems"

import { DropdownList } from 'react-widgets'

let clicked = "";

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
  clicked = e.key
}



class AntMenu extends Component {
	constructor(){
		super()
		this.state = {
			clickedItem: [],
		}
	this.click1 = this.click1.bind(this)
	}
	
	click1 = (e) => {
		this.setState({
			clickedItem: e.key
		})
		console.log(this.state)
	}
	
	render(){
		return(
			  <div id="components-dropdown-demo-dropdown-button">
				<Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
				  Dropdown
				</Dropdown.Button>

			  </div>
			);
	}
}

const menu =(
		  <Menu onClick={AntMenu.click1}>
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


export default AntMenu;
