//import React from "react";


	//filtering function
function makedata(data, byField1, byField2, aggField){
		let arr = [];
		let arrcount = [];
		let arrsum  = [];
		
		if (byField2===""){
		data.forEach(x => {
			if (arr.indexOf(String(x[byField1]))=== -1){
				arr.push(String(x[byField1]));
				arrcount.push(1)
				arrsum.push(+x[aggField]);
			} else {
				arrcount[arr.indexOf(String(x[byField1]))] = arrcount[arr.indexOf(String(x[byField1]))] + 1;
				arrsum[arr.indexOf(String(x[byField1]))] = arrsum[arr.indexOf(String(x[byField1]))] + +x[aggField];
			}			
		})
		} else {
		data.forEach(x => {
			if (arr.indexOf([x[byField1],x[byField2]])=== -1){
				arr.push([x[byField1],x[byField2]]);
				arrcount.push(1)
				arrsum.push(+x[aggField]);
			} else {
				arrcount[arr.indexOf([x[byField1],x[byField2]])] = arrcount[arr.indexOf([x[byField1],x[byField2]])] + 1;
				arrsum[arr.indexOf([x[byField1],x[byField2]])] = arrsum[arr.indexOf([x[byField1],x[byField2]])] //+ +x[aggField];
			}			
		})			
		
		}

		var result = [];
		arr.forEach((_,i) => {
			result.push({
				Value: arr[i],
				Count: arrcount[i],
				Sum: arrsum[i],
				Mean: Math.round(arrsum[i]/arrcount[i]*100)/100
			})
			
		})

		result.sort( function(a, b) {
			if (a.Value.length > 1){
				return (a.Value[0] - b.Value[0]);
			} else {
				if(a.Value[0]===b.Value[0]){
					return(a.Value[0] - b.Value[0])
				} else {
					return (a.Value[1] - b.Value[1]);
				}		
			}		
		});
		
		return(result)
	}
	
export default makedata	