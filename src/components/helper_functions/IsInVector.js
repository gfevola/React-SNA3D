

function IsInVector(Arr,val){

	var x= 0;
	var contained;
	
	//loop through
	Arr.forEach((ind) => {
		if(ind === val){
			x = x + 1
		} else {
			x = x + 0
		}
	//console.log("IsInVector: " + ind + " vs " + val + "..." + x)
	})
	
	x>0 ? contained = true : contained = false
	
	return(contained)
}
export default IsInVector;