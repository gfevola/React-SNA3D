import React, {Component} from 'react'
import { Layout } from 'antd';
import "./Sidebar/sider.css"
//import AntMenu from "../Ant_Test/AntMenu"
import NodeDropDown from "./Sidebar/NodeDropDown"
import SNACanvas from "./SNACanvas"
import FilterArray from "../helper_functions/FilterArray"
import NeighborTable from "./NeighborTable"

//import dataSNA from "C:\\Users\\Foureight24\\Desktop\\ProjectFiles\\my-app\\src\\saved_data\\HRNodes_Links Sample.json"

const { Sider } = Layout;

class SNAContainer extends Component {
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
	
	componentDidMount(){
		this.makeNodes()
	}

	makeNodes = () => {
		let n;
		this.props.nodes.forEach((nd) => {
			n =+ 1
			this.state.nodeList.push({key: n, Name: nd.name, Dept: nd.dept});
		})
	}
	
	
	//reactive - brings child component value to parent (this)
	onChangeValueHandler = (val) => {
		this.setState({ 
					value: val.Name,
					selectedNode: FilterArray(this.props.nodes,"name",val.Name)
			})
	}
	
	onCollapse = (isCollapse) => {
		this.setState({ collapsed: isCollapse })
	}
	
	render(){
		return(
			<Layout >
				<div style={{height: 500}}>
					<NeighborTable data={this.props.fullLinks} nodes={this.state.nodeList} links={this.props.links} selected={this.state.selectedNode}/>
					<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
						<NodeDropDown nodes={this.state.nodeList} value={this.state.value} onChangeValue={this.onChangeValueHandler}/>
					</Sider>
				</div>
				<SNACanvas nodes={this.props.nodes} links={this.props.links} selected={this.state.selectedNode}/>
			</Layout>
		)
	}
}
export default SNAContainer