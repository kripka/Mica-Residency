var fakedata = function(){
	
	var dataPointCount = 32,
		gpaHigh = 99,
		gpaLow = 50;
		
		
	// services variables
	var services = [
		{ name :"food","type" : "bin", "title": "Food"},
		{ name :"legal","type" : "minutes","low":0,"high":45, "title":"Legal"}
	];
		
	var ls = d3.scale.linear()
		.domain([-1,1])
		.range([gpaLow,gpaHigh]);
		
	var student = {
		"student":"Student A",
		"data" : {
			"gpa":[],
			"services":{},
			"absenteeism":{},
			"classes":{}
		} 
		
	}
	
	var temp;
	
	// add services to object
	for (var x = 0; x<services.length;x++){
		student.data.services[services[x].name] = {};
		student.data.services[services[x].name].values = [];
		student.data.services[services[x].name].type = services[x].type;
		student.data.services[services[x].name].title = services[x].title;
	}
		
	
	
	function randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	noise.seed(Math.random());

	for (var i =0; i<dataPointCount;i++){
		//gpa
		temp = {};
		//temp.value =  randomIntFromInterval(gpaLow,gpaHigh);
		temp.value = ls(noise.simplex2(i/8, 0));
		student.data.gpa.push(temp);
		
		// services
		for (var x = 0; x<services.length;x++){
			temp ={};
			
			if (services[x].type == "bin") {
				temp.value = randomIntFromInterval(0,4);
			} else if (services[x].type == "minutes"){
				temp.value = randomIntFromInterval(services[x].low,services[x].high);
			}
			student.data.services[services[x].name].values.push(temp);
		}
		
	}
	
	
	
	
	return student;
	
};