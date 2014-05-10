var renderGraph = function(data){

	console.log(data);
	

	var graphWidth = parseInt(d3.select('.dataview').style('width'));
	
	console.log(graphWidth);

	/******** LINE GRAPH ***************/
	// line graph svg
	var lg_svg = d3.select('#line-graph')
		.append('svg')
		.attr('width',graphWidth)
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
			passGreen: "#BBEABC",
			tutoring: "#1988A0",
			community: "#1988A0",
			enrichment: "#1988A0",
			life: "#1988A0",
			liasoning: "#1988A0",
			rides: "#FFD135",
			visits: "#FFD135",
			food: "#9E9B9C",
			clothing: "#9E9B9C",
			health: "#9E9B9C",
			legal: "#E51633",
			counseling: "#E51633",
			absent: "#E51633"
		},
		totalQuarters = (Math.ceil(data.data.gpa.length * 10)/10),
		totalYears = Math.ceil(totalQuarters/4),
		line_height = 30,
		text_padding_right = 10,
		block_height = 10;
		
			
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
		
	/******* BLOCK GRAPH *********/
	
	
	var blockGraph = function(data,title) {
	
		var bg_div = d3.select('#info')
			.append('div').attr('class',title.replace(/ /g,'-'));
			
		bg_div.append('h2').text(title);
				
		var bg_svg = bg_div.append('svg')
			.attr('width',graphWidth)
			.attr('height',Object.keys(data).length * line_height);
			
		var bg_g = bg_svg.append('g').attr('id',title.replace(/ /g,'-')+'-g')
			.attr('transform','translate('+ lg_padding_left + ',0)');
		
		var counter = 0,
			bgroup,
			yPlacer = function(counter){
				return counter*line_height + line_height;
			},
			blockGroup;
			
		var bg_grid = bg_g.append('g').attr('class','bg-grid'),
			bg_Xgrid = bg_g.append('g').attr('class','bg-Xgrid'),
			bg_Ygrid = bg_g.append('g').attr('class','bg-Ygrid');
			
		for (var cat in data) {
		
			bgroup = bg_g.append('g').attr('id',cat);
			
			
			// create a top line
			bgroup.append('line')
				.attr('x1',0)
				.attr('y1',yPlacer(counter))
				.attr('x2',full_length)
				.attr('y2',yPlacer(counter))
				.attr('class','indicator-y-line');
			
			
			//label
			bgroup.append('text')
				.text(data[cat].title)
				.attr('x',0 - text_padding_right)
				.attr('y',yPlacer(counter) - line_height/2 +3)
				.style('text-anchor','end');
				
			/// grid lines	
			for (var i = -1; i < totalYears*4;i++){
				bg_Xgrid.append('line')
					.attr('x1',xScale((i+1)))
					.attr('y1',0)
					.attr('x2',xScale((i+1)))
					.attr('y2',full_height)
					.attr('class','quarter-line');	
			}
			
			for (var i = -1; i < totalYears ;i++){
				bg_Xgrid.append('line')
					.attr('x1',xScale((i+1) *4))
					.attr('y1',0)
					.attr('x2',xScale((i+1) *4))
					.attr('y2',full_height + lg_padding_bottom)
					.attr('class','year-line');
			}
		
			for (var i = 5; i <= 10;i++){
				bg_Ygrid.append('line')
					.attr('x1',0)
					.attr('y1',yScale(i*10))
					.attr('x2',full_length)
					.attr('y2',yScale(i*10))
					.attr('class','gpa-line');
			}
			
			// blocks
			blockGroup = bg_g.append('g').attr('class','block-group')
				.attr('transform','translate(0,'+yPlacer(counter -1)+')');
			
						
			
			
				var maxCounts = d3.max(data[cat].values,function(d){
					return d.value;
				});
				
				var countColors = d3.scale.linear().domain([0,maxCounts]).range(['white',color[cat]]);
				
				blockGroup.selectAll('.block').data(data[cat].values).enter()
					.append('rect')
					.attr('x',function(d,i){
						return xScale(i);
					})
					.attr('y',(line_height - block_height)/2)
					.attr('width',full_length/totalQuarters)
					.attr('height',block_height)
					.attr('class','block')
					.style('fill',function(d){
						return countColors(d.value);
					});


			
			
			// increment counter
			counter++;
			
		} // end for in 
		
		// set svg height
		bg_svg.attr('height',line_height * counter)

	}
	
	blockGraph(data.data.services,"Thread Services");
	blockGraph(data.data.absenteeism,"Absenteeism");
	
	
	var gradeGraph = function(data,title) {
	
		var categories = [];
		
		for (var subject in data){
			categories.push(data[subject].name);
		}
		var arrayUnique = function(a) {
		    return a.reduce(function(p, c) {
		        if (p.indexOf(c) < 0) p.push(c);
		        return p;
		    }, []);
		};
		
		var cats = arrayUnique(categories);
		categories = [];
		
		for (var subject in data){
			categories.push(data[subject].category);
		}
		var catsClean = arrayUnique(categories);
		
		var bg_div = d3.select('#info')
			.append('div').attr('class',title.replace(/ /g,'-'));
			
		bg_div.append('h2').text(title);
				
		var bg_svg = bg_div.append('svg')
			.attr('width',graphWidth)
			.attr('height', cats.length * line_height);
			
		var bg_g = bg_svg.append('g').attr('id',title.replace(/ /g,'-')+'-g')
			.attr('transform','translate('+ lg_padding_left + ',0)');
			
		var bg_grid = bg_g.append('g').attr('class','bg-grid'),
			bg_Xgrid = bg_g.append('g').attr('class','bg-Xgrid'),
			bg_Ygrid = bg_g.append('g').attr('class','bg-Ygrid');
			
		var counter = 0,
			bgroup,
			yPlacer = function(counter){
				return counter*line_height + line_height;
			},
			colorScale=d3.scale.category10(),
			blockGroup;
		
		// set up the rows, key by category id for ind. classes	
		for (var c = 0; c<cats.length;c++) {
			
			bgroup = bg_g.append('g').attr('id',catsClean[c])
				.attr('transform','translate(0,'+ c * line_height +')');
			
			
			// create a top line
			bgroup.append('line')
				.attr('x1',0)
				.attr('y1',yPlacer(c))
				.attr('x2',full_length)
				.attr('y2',yPlacer(c))
				.attr('class','indicator-y-line');
			
			
			//label
			bgroup.append('text')
				.text(cats[c])
				.attr('x',0 - text_padding_right)
				.attr('y',line_height/2 +3)
				.style('text-anchor','end');
				
			/// grid lines	
			for (var i = -1; i < totalYears*4;i++){
				bg_Xgrid.append('line')
					.attr('x1',xScale((i+1)))
					.attr('y1',0)
					.attr('x2',xScale((i+1)))
					.attr('y2',full_height)
					.attr('class','quarter-line');	
			}
			
			for (var i = -1; i < totalYears ;i++){
				bg_Xgrid.append('line')
					.attr('x1',xScale((i+1) *4))
					.attr('y1',0)
					.attr('x2',xScale((i+1) *4))
					.attr('y2',full_height + lg_padding_bottom)
					.attr('class','year-line');
			}
		
			for (var i = 5; i <= 10;i++){
				bg_Ygrid.append('line')
					.attr('x1',0)
					.attr('y1',yScale(i*10))
					.attr('x2',full_length)
					.attr('y2',yScale(i*10))
					.attr('class','gpa-line');
			}

		} // for c
		
		var categorySort = {},
			temp;
		
		for (var c in catsClean){
			categorySort[catsClean[c]]= [];
		}
				
		for (var c in data) {
			for (var x =  0;x<data[c].grades.length;x++){
				categorySort[data[c].category].push(data[c].grades[x]);
			}
	
		}
		
		var passColors = d3.scale.linear().domain([65,100]).range([color.passGreen,d3.rgb(color.passGreen).darker(1)]);
		
		var place;
		// go thru each class
		for (var c in categorySort) {
			place = d3.select('#'+c);
			
			place.selectAll('.block').data(categorySort[c]).enter()
				.append('rect')
				.attr('x',function(d,i){
					return xScale( ((d.year-1))*4 + d.quarter-1) ;
				})
				.attr('y',(line_height - block_height)/2)
				.attr('width',full_length/totalQuarters)
				.attr('height',block_height)
				.attr('class',function(d){
					return 'block year-'+d.year+' quarter-'+d.quarter + ' '+c;
				})
				.style('fill',function(d){
					if (d.grade < 65) {
						return color.failRed;
					} else {
						return passColors(d.grade);
					}
				});
			
		}
		
			
			
	}; // end gradeGraph
	
	gradeGraph(data.data.classes,"Individual Class Grades");
		

}



renderGraph(fakedata());

/*
d3.json("http://localhost:8000/js/imp.json",function(data){
	renderGraph(data);
});
*/
