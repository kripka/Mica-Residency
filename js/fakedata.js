var fakedata = function(){
	
	var dataPointCount = 13,
		gpaHigh = 99,
		gpaLow = 50;
		
	var ls = d3.scale.linear()
		.domain([-1,1])
		.range([gpaLow,gpaHigh]);
		
	var student = {
		"student":"Student A",
		"data" : {
			"gpa":[],
		} 
	}
		
	var temp;
	
	function randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	noise.seed(Math.random());

	for (var i =0; i<dataPointCount;i++){
		temp = {};
		//temp.value =  randomIntFromInterval(gpaLow,gpaHigh);
		temp.value = ls(noise.simplex2(i/8, 0));
		student.data.gpa.push(temp);
	}
	
	return student;
	
};