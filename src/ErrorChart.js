import React, {Component} from 'react';
import * as d3 from "d3";
import axis2 from './axis2';

function getReformatedErr(err,startYear){
  var newErr=[];
  for(var i=0;i<err.length;i++){
    newErr.push({"year":parseInt(startYear)+i*0.25,"error":parseFloat(err[i])})
  }
  return newErr;
}
function getNewErrBar(startYear,isPlus){
  var newErr=[];
  for(var i=0;i<21;i++){
    newErr.push({"year":parseInt(startYear)+i*0.25,"error":isPlus?10:-10})
  }
  return newErr;
}
function getNewAxis(startYear,axis){
  var newErr=[];
  for(var i=0;i<21;i++){
    newErr.push({"x":parseInt(startYear)+i*0.25,"y":axis[i].y})
  }
  return newErr;
}
class ErrorChart extends Component {
  constructor(props){
      super(props)
      this.state = {err:[],reformattedErr:[],plusBar:[],negBar:[],startYear:1980}
  }
  componentDidMount(){
      this.draw()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      err: nextProps.err, 
      startYear:nextProps.startYear,
      reformattedErr:getReformatedErr(nextProps.err,nextProps.startYear), 
      plusBar:getNewErrBar(nextProps.startYear,true),
      negBar:getNewErrBar(nextProps.startYear,false)
    },this.draw); 
  }

  draw(){
    const width = 700;
    const height = 300;
    d3.select("#err_id").remove();
    var err=this.state.reformattedErr;
    var negBar=this.state.negBar;
    var plusBar=this.state.plusBar;
    if(err.length>0)
      var axis=getNewAxis(err[0].year,axis2);
    else
      axis=axis2;
    const margin = { top: 50, right: 100, bottom: 80, left: 175  };
    const yMinValue = d3.min(axis, d => d.y);
    const yMaxValue = d3.max(axis, d => d.y);
    const xMinValue = d3.min(axis, d => d.x);
    const xMaxValue = d3.max(axis, d => d.x);
      const svg = d3
      .select('#container')
      .append('svg')
      .attr('id',"err_id")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

      var tooltip = d3.select("#container")
      .append("div")
      .attr("class", "tooltip")
      .style("font-weight", 700)
      .style("font-size","20px")
      .style("opacity", 0);  
  
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
      .x(err=>xScale(err.year))
      .y(err=>yScale(err.error))    
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
      .datum(negBar)
      .attr('fill', 'none')
      .attr('stroke', '#f62810')
      .attr('stroke-width', 4)
      .attr('class', 'line')
      .style('stroke-dasharray', ('3, 3'))
      .attr('d', line);
    svg
      .append('path')
      .datum(plusBar)
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

    //mouse hover
    svg
      .selectAll(".dot")
      .data(err, function(d) {return d.year+':'+d.error;})
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return xScale(d.year)})
      .attr("cy", function(d) { return yScale(d.error)})
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
      tooltip.text(d.error.toFixed(2) + "% , " +d.year)
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
      .append("text")
      .attr("x", (width/2))
      .attr("y", 0-margin.top/2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Prediction Error Percentage, Quarterly");
    //legend
    svg.append("circle").attr("cx",670).attr("cy",-12).attr("r",6).style("fill","#2570D7");
    svg.append("text").attr("x",680).attr("y",-12).text("Prediction Error")
      .style("font-size","15px").attr("alignment-baseline", "middle");
    //axis name
    svg.append("text").attr("x",(width/2)).attr("y",350).text("Year")
      .style("font-size","15px").attr("alignment-baseline", "middle");
    svg.append("text").attr("x",-20).attr("y",-12).text("Error%")
      .style("font-size","15px").attr("alignment-baseline", "left");

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