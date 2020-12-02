import React, {Component} from 'react';
import * as d3 from "d3";
import err from './err';
import err1 from './err1';
import err2 from './err2';
import axis2 from './axis2';

class ErrorChart extends Component {
 /*constructor(props){
    super(props)
    this.state = {data:''}
}*/

componentDidMount(){
    this.draw()
}


draw(){

  const width = 700;
  const height = 300;
  const margin = { top: 50, right: 100, bottom: 80, left: 50 };
  const yMinValue = d3.min(axis2, d => d.y);
  const yMaxValue = d3.max(axis2, d => d.y);
  const xMinValue = d3.min(axis2, d => d.x);
  const xMaxValue = d3.max(axis2, d => d.x);

  const svg = d3
    .select('#container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3
    .scaleLinear()
    .domain([xMinValue, xMaxValue])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([yMinValue, yMaxValue]);
  const line = d3
    .line()
    .x(err => xScale(err.year))
    .y(err => yScale(err.error))    
    .curve(d3.curveMonotoneX);

  svg
    .append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${height})`)
    .call(
    d3.axisBottom(xScale)
        .tickSize(-height)
        .tickFormat(''),
    );
  svg
    .append('g')
    .attr('class', 'grid')
    .call(
        d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat(''),
    );
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom().scale(xScale).tickSize(15));
  svg
    .append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale).ticks(20));
  svg
    .append('path')
    .datum(err1)
    .attr('fill', 'none')
    .attr('stroke', '#f62810')
    .attr('stroke-width', 4)
    .attr('class', 'line')
    .style('stroke-dasharray', ('3, 3'))
    .attr('d', line);
  svg
    .append('path')
    .datum(err2)
    .attr('fill', 'none')
    .attr('stroke', '#f62810')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .style('stroke-dasharray', ('3, 3'))
    .attr('d', line);
  svg
    .append('path')
    .datum(err)
    .attr('fill', 'none')
    .attr('stroke', '#2570D7')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);
  //title
  svg
    .append("text")
    .attr("x", (width/2))
    .attr("y", 0-margin.top/2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Prediction Error Percentage, Quarterly");
  //legend
  svg.append("circle").attr("cx",670).attr("cy",-12).attr("r",6).style("fill","#2570D7")
  svg.append("text").attr("x",680).attr("y",-12).text("Prediction Error")
    .style("font-size","15px").attr("alignment-baseline", "middle")
  //axis name
  svg.append("text").attr("x",(width/2)).attr("y",350).text("Year")
    .style("font-size","15px").attr("alignment-baseline", "middle")
  svg.append("text").attr("x",-20).attr("y",-12).text("Error%")
    .style("font-size","15px").attr("alignment-baseline", "left")

}


render(){

    return (
      <div id="container">
        <svg />
      </div>
    )
}
}
      
  export default ErrorChart;