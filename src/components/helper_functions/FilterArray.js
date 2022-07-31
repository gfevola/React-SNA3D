

function FilterArray(data, Field, value){
		let returnArr = [];

		data.forEach(x => {
			if(x[Field]===value){
				returnArr.push(x);
			}
		})

	return(returnArr)
}

export default FilterArray