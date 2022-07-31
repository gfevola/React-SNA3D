

function mergeData(emails,nodes){

	let arr = [];
	
	emails.forEach(e => {
		nodes.forEach(nd => {
			if (e.Recipient === nd.EmpID){
				arr.push({"source":e.Sender,
							"target":e.Recipient,
							"Date": e.Date,
							"Embedding1":nd.state[0].Embedding1,
							"Embedding2":nd.state[0].Embedding2,
							"JobCode":nd.state[0].JobCode,
							"Location":nd.state[0].Location,
							"Salary":nd.state[0].Salary,
							"ServiceLine":nd.state[0].ServiceLine,
				})
			}
		})
	})
	console.log(arr)
	return(arr);
	
};
export default mergeData;