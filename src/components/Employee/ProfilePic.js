import React, { Component } from 'react'

class ProfilePic extends Component {

	render(){
		
		let profileStyling = {
			'height':400,
			'width':400, 
			'backgroundColor':'#b2b2b2',
			'marginLeft': '10px',
			'marginRight': '10px',
			'marginTop': '10px',
			'marginBottom': '10px'	
		}
	

		return(
			<div>
				<div id="ProfilePic" style={profileStyling}>
				</div>
			</div>
		)
	}
	
};

export default ProfilePic;