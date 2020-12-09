const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const height = window.innerHeight/2;
const width = window.innerWidth/2;
const margin = ({top: 20, right: 30, bottom: 30, left: 30})
const caption_text = "Ratio of 'Hong-Kong' to 'China' News Articles by SCMP"
const parser = d3.timeParse("%Y")

class RatioLineChart extends D3Component {
  initialize(node, props) {
    const data = props.data
    console.log("init")
    console.log(data)
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%')
    .style('height', 'auto');


    data.forEach(function(d) {
      d.Date = parser(d.Date);
    })

    const y = d3.scaleLinear()
      .domain([0.3, 0.8])
      .range([height - margin.bottom, margin.top])

    const x = d3.scaleTime()
     // .domain([new Date("2012"), new Date(String(props.year))])
      .domain([new Date("2012"), new Date(String(props.year))])
      .range([margin.left, width - margin.right])  

  const yAxis = g => g
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(d3.axisRight(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", -width + margin.left)
      .attr("text-anchor", "start")
      .attr("font-size", "1rem")
      .text(caption_text))

  const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width/ 80).tickSizeOuter(0))

  svg.append("g")
      .call(xAxis);

  svg.append("g")
     .call(yAxis);

  svg
     .append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 3)
     .attr("d", d3.line()
       .x(function(d) { return x(d.Date) })
       .y(function(d) { return y(d.Ratio) })
       )

    svg
       .append("line")
       .attr("x1", x(new Date("2016")))
       .attr("y1", height)
       .attr("x2", x(new Date("2016")))
       .attr("y2", 0)
       .attr("stroke-width", 1)
       .style("stroke-dasharray", ("3, 3"))
       .attr("stroke", "black");




  }

  update(oldProps) {
    var svg = d3.select('svg');

    const data = oldProps.data
    console.log("update")
    console.log(data)

    svg.selectAll('g')
      .remove()  

    const y = d3.scaleLinear()
    .domain([0.3, 0.8])
    .range([height - margin.bottom, margin.top])

    const x = d3.scaleTime()
      .domain([new Date("2012"), new Date(String(oldProps.year))])
      .range([margin.left, width - margin.right])  


    const yAxis = g => g
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(d3.axisRight(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", -width + margin.left)
      .attr("text-anchor", "start")
      .attr("font-size", "1rem")
      .text(caption_text))

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width/ 80).tickSizeOuter(0))

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg
        .select("path")
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.Date) })
          .y(function(d,i) { return y(d.Ratio) })
          )

     svg
        .select("line")
        .transition()
        .attr("x1", x(new Date("2016")))
        .attr("y1", height)
        .attr("x2", x(new Date("2016")))
        .attr("y2", 0)


  }
}

module.exports = RatioLineChart;
