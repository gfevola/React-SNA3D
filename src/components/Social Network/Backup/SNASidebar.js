import React, {Component} from 'react'
import { Layout } from 'antd';
import * as THREE from "three"
import "./sider.css"
//import AntMenu from "../Ant_Test/AntMenu"
import NodeDropDown from "./NodeDropDown"
import SNAParticle from "./SNAParticle"
import FilterArray from "../helper_functions/FilterArray"

import dataSNA from "C:\\Users\\Foureight24\\Desktop\\ProjectFiles\\my-app\\src\\saved_data\\HRNodes_Links Sample.json"


const { Sider } = Layout;

console.log(dataSNA)

class SNASidebar extends Component {
	constructor(){
		super()
		
		this.state = {
			collapsed: false,
			nodeList: [],
			value:"",
			selectedNode:[],
		}
			
		this.makeNodes = this.makeNodes.bind(this);
		this.onChangeValueHandler = this.onChangeValueHandler.bind(this);
	}
	
	
	makeNodes = () => {
		dataSNA.nodes.forEach((nd) => {
			this.state.nodeList.push(nd.name);
		})
	}
	
	//reactive - brings child component value to parent (this)
	onChangeValueHandler = (val) => {
		this.setState({ 
					value: val,
					selectedNode: FilterArray(dataSNA.nodes,"name",val)
			})
	}
	
	render(){
		this.makeNodes()

		return(
			<Layout >
				<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
					<NodeDropDown nodes={this.state.nodeList} value={this.state.value} onChangeValue={this.onChangeValueHandler}/>
				</Sider>
				<SNAParticle />
			</Layout>
		)
	}
}
export default SNASidebar