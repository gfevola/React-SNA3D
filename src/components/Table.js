import React, { PureComponent } from "react";
import axios from "axios";
import AxiosDataClean from "./Axios/AxiosDataClean"
import ClickTable from "./helper_functions/ClickTable"
//import TableTest from "./helper_functions/TableTest"

class Table extends PureComponent {
	
	constructor(){
		super()
		this.state = {
			elementList: []
		}
	this.refreshList = this.refreshList.bind(this)	
	}	
	
	componentDidMount(){
		this.refreshList()
	}
	
	 ///api data request	
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/reports")
          .then(res => {
			  let dd = AxiosDataClean(res.data,"Test_Demo",true);
			  this.setState({ 
					elementList: dd
			  })
		  })
          .catch(err => console.log(err));
		  	
      };
	
	//render
	render(){
		return(
		<div>
			<div style={{color:"white"}}>
				<ClickTable tableData={this.state.elementList} />

			</div>
		</div>
		)
	}

}
export default Table;