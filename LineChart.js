import React, {Component} from 'react';
import {useState, useEffect} from 'react';
import * as d3 from "d3";
import data from './data';
import data2 from './data2';
import axis from './axis';
import App from './App';

function LineChart() {
 /*constructor(props){
    super(props)
    this.state = {data:''}
}*/

useEffect(() => {
    draw()
}, []);


function draw(){

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
    .x(function(d) { return xScale(d.year);})
    .y(function(d) { return yScale(d.BCPI);})    
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
    .attr('id', 'predSet')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#f6c3d0')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);

  svg
    .append('path')
    .attr('id', 'accSet')
    .datum(data2)
    .attr('fill', 'none')
    .attr('stroke', '#2570D7')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);


  //mouse hover  
  svg
    .selectAll(".dot")
    .data(data, function(d) {return d.year+':'+d.BCPI;})
    .enter()
    .append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return xScale(d.year)})
      .attr("cy", function(d) { return yScale(d.BCPI)})
      .attr("stroke", "#FF0000")
      .attr("stroke-width", 1.5)
      .attr("fill", "#FFFFFF")
      .on('mouseover', function (event, d, i) {
        d3.select(this).transition()
              .duration('100')
              .attr("r", 7);
        tooltip.transition()
            .duration(100)
            .style("opacity", 1);
        tooltip.text("BCPI is " + d.BCPI + " in the year " + d.year)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 15) + "px");
              //.attr('transform', `translate(${x}, ${y})`);
            })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('200')
            .attr("r", 5);
        tooltip.transition()
            .duration('200')
            .style("opacity", 0);
          });

  svg
    .selectAll(".dot")
    .data(data2)
    .enter()
    .append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return xScale(d.year)})
      .attr("cy", function(d) { return yScale(d.BCPI)})
      .attr("stroke", "#0000A0")
      .attr("stroke-width", 1.5)
      .attr("fill", "#FFFFFF")
      .on('mouseover', function (event, d, i) {
        d3.select(this).transition()
              .duration('100')
              .attr("r", 7);
        tooltip.transition()
             .duration(100)
             .style("opacity", 1);
        tooltip.text("BCPI is " + d.BCPI + " in the year " + d.year)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 15) + "px");
              //.attr('transform', `translate(${x}, ${y})`);
            })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
             .duration('200')
             .attr("r", 5);
        tooltip.transition()
             .duration('200')
             .style("opacity", 0);
            });

    var tooltip = d3.select("#container")
      .append("div")
      .attr("class", "tooltip")
      .style("font-weight", 800)
      .style("opacity", 0);
   
  /*var tooltip = d3.select("#container")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .text("This is actual values: " + data2.BCPI + " in " + data2.year)

  var tooltip2 = d3.select("#container")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .text("This is predicted values: " + data.BCPI + " in " + data.year)

  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    tooltip
      .attr("x", (width/2))
      .attr("y", 0-margin.top/2)
  }

  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  var mouseover2 = function(d) {
    tooltip2
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  var mousemove2 = function(d) {
    tooltip2
      .attr("x", (width/2))
      .attr("y", 0-margin.top/2)
  }

  var mouseleave2 = function(d) {
    tooltip2
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
  
  d3.select("#predSet")
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseout", mouseleave2);

  d3.select("#accSet")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseleave); */

  
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

return (
        <div id="container">
          <svg />
        </div>
        )
}
      
  export default LineChart;