import React, {Component} from 'react';
import * as d3 from "d3";
import data from './data';
import data2 from './data2';
import axis from './axis'

class BarChart extends Component {
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
  const yMinValue = d3.min(axis, d => d.y);
  const yMaxValue = d3.max(axis, d => d.y);
  const xMinValue = d3.min(axis, d => d.x);
  const xMaxValue = d3.max(axis, d => d.x);

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
    .x(data => xScale(data.year))
    .y(data => yScale(data.BCPI))    
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
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#f6c3d0')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);
  svg
    .append('path')
    .datum(data2)
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
    .text("Actual BCPI vs Predicted BCPI, Quarterly");
  //legend
  svg.append("circle").attr("cx",720).attr("cy",10).attr("r",6).style("fill","#f6c3d0")
  svg.append("circle").attr("cx",720).attr("cy",40).attr("r",6).style("fill","#2570D7")
  svg.append("text").attr("x",730).attr("y",10).text("Predicted")
    .style("font-size","15px").attr("alignment-baseline", "middle")
  svg.append("text").attr("x",730).attr("y",40).text("Actual")
    .style("font-size","15px").attr("alignment-baseline", "middle")
  //axis name
  svg.append("text").attr("x",(width/2)).attr("y",350).text("Year")
    .style("font-size","15px").attr("alignment-baseline", "middle")
  svg.append("text").attr("x",-20).attr("y",-12).text("BCPI")
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
      
  export default BarChart;