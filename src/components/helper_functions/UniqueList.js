

function UniqueList(data, byField1, byField2=""){

	let arr = [];

	data.forEach((x) => {
		
		if (byField2===""){
			if (arr.indexOf(x[byField1])=== -1){
				arr.push(x[byField1]);
			}
		} else {
			if (arr.indexOf([x[byField1],x[byField2]])=== -1){
				arr.push([x[byField1],x[byField2]]);	
			}
		}
	})
		
	return(arr)
}
export default UniqueList;				