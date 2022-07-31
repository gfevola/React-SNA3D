//import React from 'react'
//import * as THREE from "three"
import DrawSimpleLine from "./DrawSimpleLine"
import MakeText from "./MakeText"


function AddAxes(xName,zName,scale){

	// axes
	let xAxis = DrawSimpleLine("xaxis1",[0,0,0],[100,0,0],"#FFFFFF")	
	let yAxis = DrawSimpleLine("yaxis1",[0,0,0],[0,100,0],"#FFFFFF")	
	let zAxis = DrawSimpleLine("zaxis1",[0,0,0],[0,0,100],"#FFFFFF")	
	
	//labels
	const xLabel = MakeText(xName,"#ffffff",1,[8,0,-4])
	const zLabel = MakeText(zName,"#ffffff",1,[-4,0,8])
	const yLabel1 = MakeText("0","#ffffff",1,[-.2,0,-.2])
	const yLabel2 = MakeText("5","#ffffff",1,[-.2,5*scale,-.2])
	const yLabel3 = MakeText("10","#ffffff",1,[-.2,10*scale,-.2])
	
	return([xAxis,yAxis,zAxis,xLabel,zLabel,yLabel1,yLabel2,yLabel3])
	
}
export default AddAxes;