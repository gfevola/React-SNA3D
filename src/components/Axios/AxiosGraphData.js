//import React from "react";

function cleandata(data,key_string,IsCols){
	let darray = []

	data.forEach(d => {
		//pull column (ModelCols field)
		if (d.ModelKey === key_string){
				darray.push(d)
			}		

	})
	
	return(darray)

}

export default cleandata