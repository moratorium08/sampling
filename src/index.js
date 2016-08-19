const $ = require('jquery');
const d3 = require('d3');

const sign = (x) => {return x > 0 ? 1 : -1;} ;
const inverseLaplaceCamulative = (u) => 
	{return -sign(u - 0.5)*Math.log(1-2*Math.abs(u-0.5));};

const sampledData = Array.apply(null, new Array(21)).map(() => {return 0;});

let dischargedNumber = 0;
const addOneRandom = () => {
		const uniformRandom = Math.random();
		const laplaceRandom = inverseLaplaceCamulative(uniformRandom);
		if (Math.abs(laplaceRandom) > 5) {
			dischargedNumber++;
		}
		else {
			sampledData[Math.round((laplaceRandom+5)*2)]++;
		}
}
$(document).ready( () =>  {
	const height = $('#svg').height();
	const svg = d3.select('#svg').style('background-color', '#223344');
	const update = () => {
		const heightScaler = d3.scaleLinear()
			.domain([0, Math.max(d3.max(sampledData, (d) => { return d; }), height-10)])
			.range([0, height-10]);
		const rects = svg
			.selectAll('rect')
			.data(sampledData)
			.transition()
			.duration(500)
			.attr('y', (d) => { return height - heightScaler(d);})
			.attr('height', (d) => {return  heightScaler(d); });
	};

	$('#add-one').click( () => {
		addOneRandom();
		update();
	});

	$('#add-ten').click( () => {
		for (let i=0; i< 10; i++) 
			addOneRandom();
		update();
	});

	$('#add-hundred').click( () => {
		for (let i=0; i<100; i++){
			addOneRandom();
		}
		update();
	});

	const rects = svg
		.selectAll('rect')
		.data(sampledData)
		.enter()
		.append('rect')
		.attr('x', (d, i) => { return i*30;})
		.attr('y', (d) => { return height - d;})
		.attr('height', (d) => {return  d; })
		.attr('width', 15)
		.attr('fill', 'lightgreen');
	const axises = svg
		.selectAll('text')
		.data(sampledData)
		.enter()
		.append('text')
		.attr("text-anchor", "middle")
		.attr('x', (d, i) => {return i*30+ 8 ;})
		.attr('y', (d) => {return height - 10 })
		.text((d, i) => { return i % 2 == 0 ? (i - 10) / 2 : '' })
		.attr('fill', 'red');
		
		
});

