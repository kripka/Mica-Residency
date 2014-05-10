var fakedata = function(){
	
	var dataPointCount = 32,
		gpaHigh = 99,
		gpaLow = 50;
		
		
	// services variables
	var services = [
		{ name :"tutoring","type" : "counts","low":0,"high":460, "title":"Tutoring"},
		{ name :"community","type" : "counts","low":0,"high":45, "title":"Community Service"},
		{ name :"enrichment","type" : "counts","low":0,"high":650, "title":"Enrichment"},
		{ name :"life","type" : "counts","low":0,"high":650, "title":"Life Skills"},
		{ name :"liasoning","type" : "counts","low":0,"high":67, "title":"Teacher Liasoning"},
		{ name :"rides","type" : "counts","low":0,"high":120, "title":"Rides To School"},
		{ name :"visits","type" : "counts","low":0,"high":780, "title":"House Visits"},
		{ name :"food","type" : "bin", "title": "Food"},
		{ name :"clothing","type" : "bin", "title":"Clothing"},
		{ name :"health","type" : "counts","low":0,"high":78, "title":"Health"},
		{ name :"legal","type" : "counts","low":0,"high":45, "title":"Legal"},
		{ name :"counseling","type" : "counts","low":0,"high":45, "title":"Counseling"},
	];
	
	// absenteeism
	var absent = [
		{ name :"absent","type" : "counts","low":0,"high":40, "title":"Absences"},
	];
	
	//classes	
	var classCategories = [
		{cat:"english",title:"English/Writing","holder":"Some English Class"},
		{cat:"math",title:"Math","holder":"Some Math Class"},
		{cat:"science",title:"Science","holder":"Some Science Class"},
		{cat:"history",title:"History/Social Studies","holder":"Some History Class"}
	];
	
	var classes=[],
		temp,temp2;
	
	for (var i = 0; i<classCategories.length;i++){
	
		for (var x = 0; x<Math.ceil(dataPointCount/4);x++){
			temp = {};
			temp.course = classCategories[i].holder;
			temp.name = classCategories[i].title;
			temp.category = classCategories[i].cat;
			temp.grades = [];
			
			for (var z = 0; z<4; z++){
				temp2={};
				temp2.year = x +1;
				temp2.quarter = z+1;
				temp2.grade = randomIntFromInterval(50,100);
				temp.grades.push(temp2);
			}
			
			classes.push(temp);
		}
	}
	
		
	var ls = d3.scale.linear()
		.domain([-1,1])
		.range([gpaLow,gpaHigh]);
		
	var student = {
		"student":"Student A",
		"data" : {
			"gpa":[],
			"services":{},
			"absenteeism":{},
			"classes":[]
		} 
		
	}
	
	student.data.classes= classes;
	
	var temp;
	
	// add services to object
	for (var x = 0; x<services.length;x++){
		student.data.services[services[x].name] = {};
		student.data.services[services[x].name].values = [];
		student.data.services[services[x].name].type = services[x].type;
		student.data.services[services[x].name].title = services[x].title;
	}
	
	// add absent to object
	for (var x = 0; x<absent.length;x++){
		student.data.absenteeism[absent[x].name] = {};
		student.data.absenteeism[absent[x].name].values = [];
		student.data.absenteeism[absent[x].name].type = absent[x].type;
		student.data.absenteeism[absent[x].name].title = absent[x].title;
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
			} else if (services[x].type == "counts"){
				temp.value = randomIntFromInterval(services[x].low,services[x].high);
			}
			student.data.services[services[x].name].values.push(temp);
		}
		
		// absences
		for (var x = 0; x<absent.length;x++){
			temp ={};

			temp.value = randomIntFromInterval(absent[x].low,absent[x].high);
			student.data.absenteeism[absent[x].name].values.push(temp);
		}
		
	}
	
	
	
	
	return student;
	
};