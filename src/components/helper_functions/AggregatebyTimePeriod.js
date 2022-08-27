

function AggregatebyPeriod(data,period,field){
	let newarr = [];

	
	data.forEach(d => {
		let dat = new Date(d['Date'])
		//prevent reference from updating fullempdata
		var newitm = Array.from(d)
		
		if (period==="Weekly"){
			newitm.Date=get_Week(dat)		
		} else 	if (period==="Daily"){
			newitm.Date=dat
		} else {
			newitm.Date=get_Month(dat)
		}
		
	newarr.push(newitm)
	})	
	
	return(newarr)
};

export default AggregatebyPeriod;


//week of the year
function get_Week(date){
	let txtYr = Number(date.getYear()) + 1900
	let txtMo = Number(date.getMonth()) + 1
	let txtDt = Number(date.getDate())
	
	let conglom = txtYr + "-" + txtMo + "-" + txtDt
	let dateX = new Date(conglom)

	var FirstofYr = new Date(txtYr+"-01-01")

	let week = Math.round((Math.round((dateX - FirstofYr)/86400000-.5,0)/7)-.5,0)

	let truncDay = addDays(FirstofYr,Number((week*7)))
	
	return(truncDay)
}

function get_Month(date){

	let txtYr = Number(date.getYear()) + 1900
	let txtMo = Number(date.getMonth()) + 1
	var FirstofMo = new Date(txtYr + "-" + txtMo + "-01")

	return(FirstofMo)
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}