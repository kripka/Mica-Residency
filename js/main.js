var renderGraph = function(data){

	// line graph svg
	var lg_svg = d3.select('#line-graph')
		.append('svg')
		.attr('width',960)
		.attr('height',200);
		
	// style and measurement variables
	var lg_padding_left = 120,
		lg_padding_right = 40,
		lg_padding_top = 40,
		lg_padding_bottom = 10,
		lg_dot_radius = 4,
		full_length = lg_svg.attr('width') - lg_padding_left - lg_padding_right,
		full_height = lg_svg.attr('height') - lg_padding_top - lg_padding_bottom,
		color = {
			failRed: "#E3B4B8",
			passGreen: "#BBEABC"
		},
		totalQuarters = (Math.ceil(data.data.gpa.length * 10)/10),
		totalYears = Math.ceil(totalQuarters/4);
		
		console.log(totalYears);
			
	// line graph group wrapper for transform
	var lg_g = lg_svg.append('g')
		.attr('transform','translate(' + lg_padding_left + ',' + lg_padding_top +')')
		.attr('id','lg-g');
	
	
	// gpa min and max values
	var minQuarter = d3.min(data.data.gpa,function(d){
			return d.date;
		});
		
	var maxQuarter = d3.max(data.data.gpa,function(d){
			return d.date;
		});
	
	
	//// X axis	function
	var xScale = d3.scale.linear()
		.domain([0,totalYears*4])
		.range([0,full_length]);
	
	
	// 	y axis function
	var yScale = d3.scale.linear()
		.domain([100,50])
		.range([0,full_height]);
		
		
	/// grid lines
	var lg_grid = lg_g.append('g').attr('id','lg-grid'),
		lg_Xgrid = lg_grid.append('g').attr('id','lg-Xgrid'),
		lg_Ygrid = lg_grid.append('g').attr('id','lg-Ygrid');
		
	for (var i = -1; i < totalYears*4;i++){
		lg_Xgrid.append('line')
			.attr('x1',xScale((i+1)))
			.attr('y1',0)
			.attr('x2',xScale((i+1)))
			.attr('y2',full_height)
			.attr('class','quarter-line');	
	}
	
	for (var i = -1; i < totalYears ;i++){
		lg_Xgrid.append('line')
			.attr('x1',xScale((i+1) *4))
			.attr('y1',-20)
			.attr('x2',xScale((i+1) *4))
			.attr('y2',full_height + lg_padding_bottom)
			.attr('class','year-line');
	}

	for (var i = 5; i <= 10;i++){
		lg_Ygrid.append('line')
			.attr('x1',0)
			.attr('y1',yScale(i*10))
			.attr('x2',full_length)
			.attr('y2',yScale(i*10))
			.attr('class','gpa-line');
	}
	
	// y axis labels and ticks
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.ticks(5)
		.tickPadding(10);
		
	lg_g.append('g')
		.call(yAxis);
		
	// year labels
		
	for (var i = 0; i< totalYears; i++){
		lg_grid.append('text')
			.attr('x',full_length/totalYears * (i+1) - (full_length/totalYears)/2 -15)
			.attr('y',-8)
			.text('Year ' + (i+1));
	}
		
	
	
	var lg_graph = lg_g.append('g').attr('id','lg-content')
		.attr('transform','translate(' + xScale(1)/2 + ',0)');
		
	
	// line generator function
	var line = d3.svg.line()
	    .x(function(d,i) { return xScale(i); })
	    .y(function(d) { return yScale(d.value); });
	
	// gpa path
	lg_graph.append("path")
		.datum(data.data.gpa)
		.attr('d',line)
		.attr('class','gpa-path');
	
	// gpa dots
	lg_graph.selectAll('.dots')
		.data(data.data.gpa)
		.enter()
		.append('circle')
		.attr('cx',function(d,i){
			return xScale(i);
			})
		.attr('cy',function(d){
			return yScale(d.value)
			})
		.attr('r',lg_dot_radius)
		.style('fill',function(d){
			if (d.value < 65) {
				return color.failRed;
			} else {
				return color.passGreen;
			}
		});

}

renderGraph(fakedata());

/*
d3.json("http://localhost:8000/js/imp.json",function(data){
	renderGraph(data);
});
*/
