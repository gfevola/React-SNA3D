//import React from "react";

function cleandata(data,key_string,IsCols){
	console.log("subfunction ADC")
	console.log(data)
	let darray = []
	data.forEach(d => {
		
		if (IsCols===false){
		//pull entire report	
			if (d.Report_Key === key_string){
				darray = d.demo
			}
		} else {
		//pull column (ModelCols field)
			if (d.ReportName === key_string){
				darray.push(d)
			}		
		}
	})
	console.log(darray);
	console.log("/subfunction")
	
	return(darray)

}

export default cleandata