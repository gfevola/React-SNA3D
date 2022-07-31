

function FilterNodes(data, fieldArray){
		let returnArr = [];

			data.forEach(dat => {
				let isIncluded = false

				fieldArray.forEach(fldArr => {
					let fld = fldArr[0]
					
					if (fld.data.length>0){

						fld.data.forEach(f => {
							if (dat[fld.field]===f){
								isIncluded = true
							}
						})
					}	
				})		
				if (isIncluded===true){
					returnArr.push(dat)
				}
			}) 

	return(returnArr)
}

export default FilterNodes