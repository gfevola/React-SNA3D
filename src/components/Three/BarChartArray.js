//import React from 'react'
//import * as THREE from "three"
import DrawRect from "./RenderObjects/DrawRect"

function BarChartArray(dataset,field1,field2){

	//spacing
	let l = .5
	let w = .5
	let v_space = .5
	let h_space = 1

	//data parsing
	let rectArry = []
	let rect
	let catArry1 = []
	let catArry2 = []

	//set up categories
	dataset.forEach((d)=> {
		if(catArry1.indexOf(d[field1])=== -1){
			catArry1.push(d[field1])
		}
		if(catArry2.indexOf(d[field2])=== -1){
			catArry2.push(d[field2])
		}
	});
	
	let a = 0;
	let b = 0;
	dataset.forEach((d)=> {
		//categorization
		a = catArry1.indexOf(d[field1])
		b = catArry2.indexOf(d[field2])
		
		rect = DrawRect("rect-"+ d[field1] + "-" + d[field2],
								[l,d.val,w],
								a,
								[
									a * (l + v_space) + 1/2,
									0 + d.val/2,
									b * (w + h_space) + 1/2
								]
							)
		//other attributes					
		rect.material.opacity = .25
		rect.Category = "Bar"
		rect.HField = d[field1]
		rect.VField = d[field2]
		
		rectArry.push(rect)					
	});
	
	return(rectArry);
}
export default BarChartArray;