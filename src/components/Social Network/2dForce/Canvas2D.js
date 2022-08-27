import React, {Component} from 'react'
import Sidebar2D from "./Sidebar2D"


class Canvas2D extends Component {

	

  render(){
	
		return(
			<div>
				<Sidebar2D 
						nodes={this.props.data1.nodes} 
						links={this.props.data1.links} 
						emails={this.props.data1.emails} 
					/>
			</div>
		)
	}
}

export default Canvas2D;