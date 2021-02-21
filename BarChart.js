import React, {Component} from 'react';
import * as d3 from "d3";
import axis from './axis';

function getReformatedArr(arr,startYear){
  var newErr=[];
  for(var i=0;i<arr.length;i++){
    newErr.push({"year":parseInt(startYear)+i*0.25,"BCPI":parseFloat(arr[i])})
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
class BarChart extends Component {
 constructor(props){
    super(props)
    this.state = {acc:[],reformattedAcc:[],pred:[],reformattedPred:[],startYear:1980}
}

componentDidMount(){
    this.draw()
}
componentWillReceiveProps(nextProps) {
  //if (this.state.startYear!==nextProps.startYear||this.state.err!==nextProps.err) {
    console.log("bar chart update",this.state.startYear,nextProps.startYear);
      this.setState({ 
    acc: nextProps.acc, 
    pred: nextProps.pred,
    startYear:nextProps.startYear,
    reformattedAcc:getReformatedArr(nextProps.acc,nextProps.startYear),
    reformattedPred:getReformatedArr(nextProps.pred,nextProps.startYear),

  },this.draw); 
 // }
}

draw(){
  d3.select("#acc_chart_id").remove();
  const width = 700;
  const height = 300;
  var pred_data=this.state.reformattedPred;
  var acc_data=this.state.reformattedAcc;
  console.log("drawing bar chart",pred_data,acc_data)
  if(pred_data.length>0)
    var dynamic_axis=getNewAxis(pred_data[0].year,axis);
  else
    var dynamic_axis=axis;
  const margin = { top: 80, right: 282, bottom: 80, left: 50 };
  const yMinValue =   Math.min(Math.min(...this.state.pred),Math.min(...this.state.acc))-5;

  const yMaxValue =   Math.max(Math.max(...this.state.pred),Math.max(...this.state.acc))+5;
  const xMinValue = d3.min(dynamic_axis, d => d.x);
  const xMaxValue = d3.max(dynamic_axis, d => d.x);

  const svg = d3
    .select('#container')
    .append('svg')
    .attr('id',"acc_chart_id")
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
    .x(pred_data => xScale(pred_data.year))
    .y(pred_data => yScale(pred_data.BCPI))    
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
    .datum(pred_data)
    .attr('fill', 'none')
    .attr('stroke', '#f6c3d0')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);
  svg
    .append('path')
    .datum(acc_data)
    .attr('fill', 'none')
    .attr('stroke', '#2570D7')
    .attr('stroke-width', 4)
    .attr('class', 'line') 
    .attr('d', line);

  //mouse hover  
  svg
    .selectAll(".dot")
    .data(pred_data, function(d) {return d.year+':'+d.BCPI;})
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
    .data(acc_data)
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