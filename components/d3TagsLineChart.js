const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const height = window.innerHeight-50;
const width = window.innerWidth;
const margin = ({top: 50, right: 50, bottom: 50, left: 50})
const caption_text = "Topic Tag Frequencies for SCMP News Articles "
const parser = d3.timeParse("%Y")

class RatioLineChart extends D3Component {
  initialize(node, props) {
    const data = props.data
    const mappedDates = data.dates.map(x => parser(x));
    console.log(mappedDates)

    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    const y = d3.scaleLinear()
      .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
      .range([height - margin.bottom, margin.top])

    const x = d3.scaleTime()
    .domain([new Date("2012"), new Date("2020")])
    .range([margin.left, width - margin.right])  


    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .attr("font-size", "15px")
          .text(caption_text))

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width/ 80).tickSizeOuter(0))

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    const line = d3.line()
      .defined(d => !isNaN(d))
      .x((d, i) => x(mappedDates[i]))
      .y(d => y(d))

    function hover(svg, path) {
      svg
          .style("position", "relative");
      
      if ("ontouchstart" in document) svg
          .style("-webkit-tap-highlight-color", "transparent")
          .on("touchmove", moved)
          .on("touchstart", entered)
          .on("touchend", left)
      else svg
          .on("mousemove", moved)
          .on("mouseenter", entered)
          .on("mouseleave", left);
    
      const dot = svg.append("g")
          .attr("display", "none");
    
      dot.append("circle")
          .attr("r", 2.5);
    
      dot.append("text")
          .style("font", "20px sans-serif")
          .attr("text-anchor", "middle")
          .attr("y", -10);
    
      function moved() {
        d3.event.preventDefault();
        const ym = y.invert(d3.event.layerY);
        const xm = x.invert(d3.event.layerX);
        const i1 = d3.bisectLeft(mappedDates, xm, 1);
        const i0 = i1 - 1;
        const i = xm - mappedDates[i0] > mappedDates[i1] - xm ? i1 : i0;
        const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);
        path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
        dot.attr("transform", `translate(${x(mappedDates[i])},${y(s.values[i])})`);
        dot.select("text").text(s.tag);

        console.log(s.tag)
      }
    
      function entered() {
        path.style("mix-blend-mode", null).attr("stroke", "#ddd");
        dot.attr("display", null);
      }
    
      function left() {
        path.style("mix-blend-mode", "multiply").attr("stroke", null);
        dot.attr("display", "none");
      }
    }

    const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .selectAll("path")
      .data(data.series)
      .enter()
      .append('path')
        .style("mix-blend-mode", "multiply")
        .attr("d", d => line(d.values));

    svg.call(hover, path);


  }

  update(oldProps) {
    var svg = d3.select('svg');

  }
}

module.exports = RatioLineChart;
