import React, {Component} from 'react'
import D3ForceNet from "./D3ForceNet"
import {Navbar, Form, Button} from 'react-bootstrap'

import { Layout, Menu, Modal } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import SearchFunction from "./SearchFunction"
import ModalColor from "./Modals/ModalColor"
import ModalBoolean from "./Modals/ModalBoolean"
import ModalFieldSelect from "./Modals/ModalFieldSelect"
import ModalRadius from "./Modals/ModalRadius"
import ModalDate from "./Modals/ModalDate"
import ModalDateRange from "./Modals/ModalDateRange"
import ModalFilterData from "./Modals/ModalFilterData"

import Loader from "react-loader-spinner"

import LinksfromEmails from "../Data/LinksfromEmails"
import FilterNodes from "../Data/FilterNodes"
import FilterLinks from "../Data/FilterLinks"

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

let emailLinks = []

var tick = 0

class Sidebar2D extends Component {
	constructor(props){
		super(props)
		this.state = {
			selected: "",
			menu1Visible: false,
			menu2Visible: false,
			menu3Visible: false,
			menu4Visible: false,
			menu5Visible: false,
			menu6Visible: false,
			menu7Visible: false,
			lastClicked: "none",
			linkColor: "#6138a3",
			nodeColor: "#43e1e5",
			viewLabels: "On",
			sphereOn: false,
			sphereRad: 10,
			nodeColorCategory:"",
			dateMin: new Date(2021,0,1),
			dateMax: new Date(2021,0,21),
			dateCurr: new Date(2021,0,1),
			fieldNamesStr:["Attribute1","Attribute2","Grouping"],
			fieldNames: ["Attribute1","Attribute2","Grouping",
						"CentralityMeasure1","CentralityMeasure2","JDMeasure1",
						"JDMeasure2","JDMeasure3","JDMeasure4","JDMeasure5"],
			filteredNodes: [],
			timerRunning:[]
		}
		this.onDropdownValueHandler = this.onDropdownValueHandler.bind(this)
		this.colorPickHandler1 = this.colorPickHandler1.bind(this)
		this.ClickOpen1 = this.ClickOpen1.bind(this)
		this.ClickOk1 = this.ClickOk1.bind(this)
		this.ClickOpen2 = this.ClickOpen2.bind(this)
		this.ClickOk2 = this.ClickOk2.bind(this)
		this.ClickOpen3 = this.ClickOpen3.bind(this)
		this.ClickOk3 = this.ClickOk3.bind(this)
		this.ClickOpen4 = this.ClickOpen4.bind(this)
		this.ClickOk4 = this.ClickOk4.bind(this)		
		this.ClickOpen5 = this.ClickOpen5.bind(this)
		this.ClickOk5 = this.ClickOk5.bind(this)	
		this.ClickOpen6 = this.ClickOpen6.bind(this)
		this.ClickOk6 = this.ClickOk6.bind(this)	
		this.ClickOpen7 = this.ClickOpen7.bind(this)
		this.ClickOk7 = this.ClickOk7.bind(this)	
		this.Cancel = this.Cancel.bind(this)

		this.handleRadiusOn = this.handleRadiusOn.bind(this)
		this.handleRadiusDiameter = this.handleRadiusDiameter.bind(this)
		this.handleDateRange = this.handleDateRange.bind(this)
		this.handleFilterData = this.handleFilterData.bind(this)	
		
		this.startTimer = this.startTimer.bind(this)
		this.endTimer = this.endTimer.bind(this)
		this.timerClick = this.timerClick.bind(this)
		this.timerTick = this.timerTick.bind(this)
		this.timebarNav = this.timebarNav.bind(this)
		this.handleDate = this.handleDate.bind(this)
		
		this.renderIf = this.renderIf.bind(this)
	}

	//reactive - brings child component value to parent (this)
	onDropdownValueHandler = (val) => {
		this.setState({
			selected: val,
			lastClicked: "selectNode"
		})
	}
	
	//modal 1 events
	colorPickHandler1 = (val) => { this.setState({ linkColor: val.hex }) }
	ClickOpen1 = () => {
						if (this.state.menu1Visible === false){
							this.setState({ menu1Visible: true, lastClicked: "linkColor" })
						}
			}
	ClickOk1 = () => { this.setState({ menu1Visible: false, lastClicked: "none" }) }

	//modal 2 events
	colorPickHandler2 = (val) => { this.setState({ nodeColor: val.hex }) }
	ClickOpen2 = () => {
						if (this.state.menu2Visible === false){
							this.setState({ menu2Visible: true, lastClicked: "nodeColor" })
						}
			}
	ClickOk2 = () => { this.setState({ menu2Visible: false, lastClicked: "none" }) }

	//modal 3 events
	toggleLabels = (val) => { 
		this.setState({ viewLabels: val.currentTarget.value }) 
	}
	ClickOpen3 = () => {
						if (this.state.menu3Visible === false){
							this.setState({ menu3Visible: true, lastClicked: "none" })
						}
			}
	ClickOk3 = () => { this.setState({ menu3Visible: false, lastClicked: "toggleLabels" }) }

	//modal 4 events
	ClickOpen4 = () => {
						if (this.state.menu4Visible === false){
							this.setState({ menu4Visible: true, lastClicked: "nodecolorCategory"  })
						}
			}
	ClickOk4 = () => { this.setState({ menu4Visible: false, lastClicked: "none"  }) }
	colorPickHandler4 = (val) => { this.setState({ nodeColorCategory: val.currentTarget.value }) }

	//modal 5 events
	ClickOpen5 = () => {
						if (this.state.menu5Visible === false){
							this.setState({ menu5Visible: true, lastClicked: "sphere"  })
						}
			}
	ClickOk5 = () => { this.setState({ menu5Visible: false, lastClicked: "none"  }) }
	handleRadiusOn = (val) => { this.setState({sphereOn: val.currentTarget.value }) }
	handleRadiusDiameter = (val) => { this.setState({sphereRad: val }) }

	//modal 6 events
	ClickOpen6 = () => {
						if (this.state.menu6Visible === false){
							this.setState({ menu6Visible: true, lastClicked: "none"  })
						}					
			}
	ClickOk6 = () => { this.setState({ menu6Visible: false, lastClicked: "dateRange"  }) }			
	handleDateRange = (val) => {
		this.setState({
			dateMin: val[0]._d,
			dateMax: val[1]._d,
		})
	}

	//modal 7 events
	ClickOpen7 = () => {
						if (this.state.menu7Visible === false){
							this.setState({ menu7Visible: true, lastClicked: "none"  })
						}					
			}
	ClickOk7 = (val) => { this.setState({ menu7Visible: false, lastClicked: "filterData"  }) }			
	
	//return filter values and column numbers
	handleFilterData = (val) => {
		
		//holding array
		let filtervals = this.state.fieldNamesStr.map(f => [{field: f , data:[]}])
		val.forEach((v,i) => {
			filtervals[+v.fieldNum][0].data.push(v.value)
		})
		
		//filter by values from modal
		this.setState({
			filteredNodes: FilterNodes(this.props.nodes,filtervals)
		})
	}

	//cancel
	Cancel = () => { this.setState({ 
							menu1Visible:false,
							menu2Visible:false,
							menu3Visible:false,
							menu4Visible:false,
							menu5Visible:false,
							menu6Visible:false,			
							menu7Visible:false,
							lastClicked: "none"  
					}) }
	
	//create bar for timed event
	timebarNav = () => {
		
		if (this.state.lastClicked==="timeline"){
			let currDateValue = this.state.dateCurr.getMonth() + "-" + this.state.dateCurr.getDay()+"-"+this.state.dateCurr.getYear()
			
			let styling = {
				marginLeft: '5px'
			}
			
			return(
				<Navbar className="bg-light justify-content-between">
				  <Form inline>
						<Button variant="dark" onClick={this.startTimer}>
						 Start
						</Button>
						<Button variant="dark" onClick={this.endTimer}>
						 End
						</Button>
						
						<ModalDate date={this.handleDate} style={styling}>
							{String(currDateValue)}
						</ModalDate>
						
					</Form>
				</Navbar>
			)
		} 
	}
	
	timerClick = () => {
		this.setState({
			lastClicked: "timeline"
		})	
	}
	
	//timer events
	startTimer = () => {
		this.setState({
			lastClicked: "timeline",
			timerRunning: setInterval(this.timerTick,4000)
		})		
	}
	
	//end timer
	endTimer = () => {
		this.setState(prevState => {
			timerRunning: clearInterval(prevState.timerRunning,1000)
		})
	}

	timerTick = () => {
		tick = tick + 1
		this.setState(prevState => ({
			dateCurr: addDays(prevState.dateCurr,1),
			dateMin: addDays(prevState.dateCurr,-7),
			dateMax: addDays(prevState.dateCurr,1)
		}))
		console.log(this.state.dateCurr)
		this.renderIf()
	}
	//
	handleDate = (val) => {
		if (val.length>0) {this.setState({ dateCurr: val._d})}
	}
	
	
	//prevent initial run of sample data
	 renderIf = (istrue) => {
		 //pass Force Net div if data is loaded 
		
		if (istrue===true){
			
			let nodes = []
			//choose the form of the destructor
			if (this.state.filteredNodes.length > 0){ 
				nodes = this.state.filteredNodes 
			} else { 
				nodes = this.props.nodes
			}
			emailLinks = LinksfromEmails(this.props.emails,this.state.dateMin,this.state.dateMax) 
			let filtLinks = FilterLinks(nodes,emailLinks)		
			
			return(<D3ForceNet 
				nodes={nodes} 
				links={filtLinks} 
				selectedID={this.state.selected}
				lastClicked={this.state.lastClicked}
				linkColor={this.state.linkColor}
				nodeColor={this.state.nodeColor}
				toggleLabels={this.state.viewLabels}
				nodeCategory={this.state.nodeColorCategory}
				sphereOn={this.state.sphereOn}
				sphereRad={this.state.sphereRad}
			/>)	
		} else {
			return(	
					<div>
						<Loader />
					</div>
				)
		}	
	}
		
	render(){
		let istrue=false;
		if (this.props.nodes.length>2){istrue = true}
		
		console.log(this.props)
		
		return(
		<div>
			<div>
				{this.timebarNav()}
			</div>
		  <Layout>

			  <Sider width={200} className="site-layout-background">
				<Menu
				  mode="inline"
				  defaultSelectedKeys={['1']}
				  defaultOpenKeys={['sub1','dataFiltering']}
				  style={{ height: '100%', borderRight: 0 }}
				>
				
				<SearchFunction nodes={this.state.filteredNodes} onChangeValue={this.onDropdownValueHandler} />

				  <SubMenu key="dataFiltering" icon={<LaptopOutlined />} title="Data Filtering">
					
					{/* modal 6 */}
					<Menu.Item key="6" onClick={this.ClickOpen6}>
						Date Range
						<Modal 
							visible={this.state.menu6Visible} 
								onCancel={this.Cancel}
								onOk={this.ClickOk6}	
						> 
							<ModalDateRange dateRange={this.handleDateRange}/>
						</Modal>
					</Menu.Item>
					
					
					{/* modal 7 */}
					<Menu.Item key="7" onClick={this.ClickOpen7}>
						Filter Data
						<Modal 
							visible={this.state.menu7Visible} 
								onCancel={this.Cancel}
								onOk={this.ClickOk7}	
						> 
							<ModalFilterData									
								fieldNames = {this.state.fieldNamesStr}
								data = {this.props.nodes}
								onSubmit = {this.handleFilterData}
							/>
						</Modal>
					</Menu.Item>
					
				  </SubMenu>
				  
				  <SubMenu key="sub1" icon={<UserOutlined />} title="Edit Visuals">
					
					{/* modal 1 */}
					<Menu.Item key="1" onClick={this.ClickOpen1}>
						Edit Link Color
							<Modal 
								visible={this.state.menu1Visible} 
								onCancel={this.ClickOk1}
								onOk={this.ClickOk1}	
							>
								<ModalColor onColorPick={this.colorPickHandler1}/>
							</Modal>
					</Menu.Item>
					
					{/* modal 2 */}
					<Menu.Item key="2" onClick={this.ClickOpen2}>
						Edit Node Color
							<Modal 
								visible={this.state.menu2Visible} 
								onCancel={this.ClickOk2}
								onOk={this.ClickOk2}	
							>
								<ModalColor onColorPick={this.colorPickHandler2}/>
							</Modal>
					</Menu.Item>	

					{/* modal 3 */}
					<Menu.Item key="3" onClick={this.ClickOpen3}>
						Toggle Labels
							<Modal 
								visible={this.state.menu3Visible} 
								onCancel={this.ClickOk3}
								onOk={this.ClickOk3}	
							>
								<ModalBoolean labelsOn={this.toggleLabels}
									defaults={true}
									defaultTag="On"
									value={true}
								/>
							</Modal>
					</Menu.Item>	
					
					{/* modal 4 */}
					<Menu.Item key="4" onClick={this.ClickOpen4}>
							Set Color By Category
							<Modal 
								visible={this.state.menu4Visible} 
								onCancel={this.ClickOk4}
								onOk={this.ClickOk4}	
							> 
								<ModalFieldSelect
									onFieldPick={this.colorPickHandler4}
									fieldNames = {this.state.fieldNames}
								/> 
							</Modal>
					</Menu.Item>
					
					{/* modal 5 */}
					<Menu.Item key="5" onClick={this.ClickOpen5}>
						Circle of Influence
							<Modal 
								visible={this.state.menu5Visible} 
								onCancel={this.ClickOk5}
								onOk={this.ClickOk5}	
							>
								<ModalRadius
								 onToggle = {this.handleRadiusOn}
								 radius = {this.handleRadiusDiameter}
								/>
							</Modal>
					</Menu.Item>			
					
				  </SubMenu>
				  
				  <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
					<Menu.Item key="9" onClick={this.timerClick}>
						Timer
					</Menu.Item>
					
					<Menu.Item key="10">option10</Menu.Item>
					<Menu.Item key="11">option11</Menu.Item>
					<Menu.Item key="12">option12</Menu.Item>
				  </SubMenu>
				</Menu>
			  </Sider>
			  <Layout style={{ padding: '0 24px 24px' }}>
				<Content
				  className="site-layout-background"
				  style={{
					padding: 24,
					margin: 0,
					minHeight: 280,
				  }}
				>
				<div>
				{/* create Force Network */}
					{this.renderIf(istrue)}
				</div>
				</Content>
			  </Layout>
		  </Layout>
		  </div>
		)
	}
}

export default Sidebar2D;
	
	
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

