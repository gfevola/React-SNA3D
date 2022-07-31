
function LinksfromEmails(emaildata,dateMin,dateMax){
	
	let linkdata = [];
	let link_idx = [];
	
	let new_dateMin = new Date(dateMin)
	let new_dateMax = new Date(dateMax)


	emaildata.forEach((e,i) => {
		let edate = new Date(e.date)
		
		if (edate > new_dateMin & edate < new_dateMax ){ //filter dates
			//add
			if (link_idx.indexOf(e['source']+"|"+e['target'])=== -1){
				let x = link_idx.length
				linkdata.push({id: x, index: x, source: e['source'],target: e['target']})
				
				link_idx.push(e['source']+"|"+e['target'])
			}
		}
	})
 
 return(linkdata)

}
export default LinksfromEmails;