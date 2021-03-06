var fakedata = function(){
	
	var dataPointCount = 32,
		gpaHigh = 99,
		gpaLow = 50;
		
		
	// services variables
	var services = [
		{ name :"tutoring","type" : "counts","low":0,"high":460, "title":"Tutoring", "unit":"minutes"},
		{ name :"community","type" : "counts","low":0,"high":45, "title":"Community Service", "unit":"minutes"},
		{ name :"enrichment","type" : "counts","low":0,"high":650, "title":"Enrichment", "unit":"minutes"},
		{ name :"life","type" : "counts","low":0,"high":650, "title":"Life Skills", "unit":"minutes"},
		{ name :"liasoning","type" : "counts","low":0,"high":67, "title":"Teacher Liasoning", "unit":"minutes"},
		{ name :"rides","type" : "counts","low":0,"high":120, "title":"Rides To School", "unit":"minutes"},
		{ name :"visits","type" : "counts","low":0,"high":780, "title":"House Visits", "unit":"minutes"},
		{ name :"food","type" : "bin", "title": "Food", "unit":"qual"},
		{ name :"clothing","type" : "bin", "title":"Clothing", "unit":"qual"},
		{ name :"health","type" : "counts","low":0,"high":78, "title":"Health", "unit":"minutes"},
		{ name :"legal","type" : "counts","low":0,"high":45, "title":"Legal", "unit":"minutes"},
		{ name :"counseling","type" : "counts","low":0,"high":45, "title":"Counseling", "unit":"minutes"},
	];
	
	// absenteeism
	var absent = [
		{ name :"absent","type" : "counts","low":0,"high":40, "title":"Absences", "unit":"days"},
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
		"images":[
			{year: 1, path: "images_thread/photodiquann1.png"},
			{year: 2, path: "images_thread/photodiquann1.png"},
			{year: 3, path: "images_thread/photodiquann2.png"},
			{year: 4, path: "images_thread/photodiquann3.png"},
			{year: 5, path: "images_thread/photodiquann3.png"},
			{year: 6, path: "images_thread/photodiquann3.png"},
			{year: 7, path: "images_thread/photodiquann4.png"},
			{year: 8, path: "images_thread/photodiquann4.png"}
		],
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
		student.data.services[services[x].name].unit = services[x].unit;
	}
	
	// add absent to object
	for (var x = 0; x<absent.length;x++){
		student.data.absenteeism[absent[x].name] = {};
		student.data.absenteeism[absent[x].name].values = [];
		student.data.absenteeism[absent[x].name].type = absent[x].type;
		student.data.absenteeism[absent[x].name].title = absent[x].title;
		student.data.absenteeism[absent[x].name].unit = absent[x].unit;
	}
		
	
	
	function randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	noise.seed(Math.random());

	for (var i =0; i<dataPointCount;i++){
		//gpa
		temp = {};
		//temp.value =  randomIntFromInterval(gpaLow,gpaHigh);
		temp.value = ls(noise.simplex2(i/8, 0)).toFixed(2);
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