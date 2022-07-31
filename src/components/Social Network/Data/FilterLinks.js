

function FilterLinks(nodes,links){
	let returnArr = []
	
	let nodeids = nodes.map(nd => {return nd.EmpID})
	
	links.forEach(lk => {
		
		let include = false
		nodes.forEach(nd => {
			if (nodeids.indexOf(lk.source)!== -1 & nodeids.indexOf(lk.target)!== -1){
					include  =true
			}
		})
		
		if (include===true){
			returnArr.push(lk)
		}
	})

	return(returnArr)
};
export default FilterLinks;