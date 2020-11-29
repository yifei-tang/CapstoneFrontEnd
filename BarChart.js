import React, {Component} from 'react';
import * as d3 from "d3";
import data from './data'

class BarChart extends Component {
  constructor(props){
    super(props)
    this.state = {data:''}
}

componentDidMount(){
    this.draw()
}


draw(){

  const width = 700;
  const height = 300;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const yMinValue = d3.min(data, d => d.BCPI);
  const yMaxValue = d3.max(data, d => d.BCPI);
  const xMinValue = d3.min(data, d => d.year);
  const xMaxValue = d3.max(data, d => d.year);

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
    .x(d => xScale(d.year))
    .y(d => yScale(d.BCPI))    
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
    .call(d3.axisLeft(yScale));
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#f6c3d0')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);

}


render(){

    return (
      <div id="container" />
    )
}
}
      
  export default BarChart;