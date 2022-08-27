import React, {Component} from 'react'
import SNAParticle from "./SNAParticle"
import SNASidebar from "./SNASidebar"

import dataSNA from "C:\\Users\\Foureight24\\Desktop\\ProjectFiles\\my-app\\src\\saved_data\\HRNodes_Links Sample.json"


class SNABase extends Component {
	constructor(){
		super()
		
	}
	
	render(){

		return(<div>
			<SNASidebar data={dataSNA.nodes}/>
				
			
		</div>)
	}
}

export default SNABase;