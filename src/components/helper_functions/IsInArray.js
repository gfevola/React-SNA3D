

function IsInArray(Arr,val,arrCol){

	var x= 0;
	var contained;

	//loop through
	Arr.forEach((ind) => {
		if(ind[arrCol] === val){
			x = x + 1
		} else {
			x = x + 0
		}
	//console.log("isinarray: " + ind[arrCol] + " vs " + val + "..." + x)
	})
	
	x>0 ? contained = true : contained = false
	
	return(contained)
}
export default IsInArray;