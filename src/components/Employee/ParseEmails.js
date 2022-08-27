

function parseEmails(data){
	//need to filter, combine dates to week/month/etc
	
	let a = 0
	let linkarray = [];
	data.forEach(ln => {
		a += 1
		linkarray.push({index: a,
					date: ln.Date, 
					source: ln.Sender, 
					target: ln.Recipient});
		
	})
	return(linkarray);
};

export default parseEmails;