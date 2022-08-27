//import React from "react";

function AxiosParse(data,key_string,IsCols){
	console.log("subfunction A3P")
	console.log(data)
	let darray = []
	data.forEach(d => {
		darray.push(d)		
	})
	console.log(darray);
	console.log("/subfunction")
	
	return(darray)

}

export default AxiosParse