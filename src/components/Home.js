import React, { PureComponent } from "react";
import "./styling/homeSpinner.css"
import ImgBack from "./Three/Images/corona_bk.png"
import ImgDown from "./Three/Images/corona_dn.png"
import ImgUp from "./Three/Images/corona_up.png"
import ImgFront from "./Three/Images/corona_ft.png"
import ImgLeft from "./Three/Images/corona_lf.png"
import ImgRight from "./Three/Images/corona_rt.png"
//import JQueryMin from "./styling/jquery.rotataDiz.min"
import "./styling/style.css"

class Home extends PureComponent {
	
	constructor(){
		super()

		this.state = {
			selected:[]
		}
	}	
	

	//render
	render(){

		let imageCarousel = [ImgBack, ImgDown, ImgUp, ImgFront, ImgLeft, ImgRight]
		console.log(imageCarousel)
		return(
			<div id="gallery">
				<div id="rotata">

				</div>

			</div>
			
		)
	}

};

//<a href="#" style="float: left" onClick="galleryspin('-')">L</a>
//<a href="#" style="float: right" onClick="galleryspin('')">R</a>

/* function galleryspin(sign) {
	//var angle;
	var spinner = document.querySelector("#spinner");
	if (!sign) {
		angle = angle + 45;
	} else {
		angle = angle - 45;
	}
	spinner.setAttribute("style","-webkit-transform: rotateY(45deg); -moz-transform:" +
			"rotateY(45deg); transform: rotateY(45deg);")
};
 */
export default Home;