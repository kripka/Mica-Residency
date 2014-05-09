d3.json("http://localhost:8000/js/imp.json",function(data){
	
	
	// svg
	var lg_svg = d3.select('#line-graph')
		.append('svg')
		.attr('width',780)
		.attr('height',500);
	
	// line graph
	console.log(data.data.gpa);
	
	var lg_g = lg_svg.append('g');
	
	var minQuarter = d3.min(data.data.gpa,function(d){
			return d.date;
		});
		
	var maxQuarter = d3.max(data.data.gpa,function(d){
			return d.date;
		});
		
	var xScaleAxis = d3.scale.linear()
		.domain([minQuarter,maxQuarter])
		.range([0,lg_svg.attr('width')]);
		
	var yScaleAxis = d3.scale.linear()
		.domain([50,100])
		.range([0,lg_svg.attr('height')]);
	
	var line = d3.svg.line()
	    .x(function(d) { return xScaleAxis(d.date); })
	    .y(function(d) { return yScaleAxis(d.value); });
	
	lg_g.append("path")
		.datum(data.data.gpa)
		.attr('d',line)
		.attr('class','gpa-path');
	
});

