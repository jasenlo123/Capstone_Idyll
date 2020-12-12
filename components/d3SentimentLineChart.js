const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const height = window.innerHeight/2;
const width = window.innerWidth/2;
const margin = ({top: 20, right: 30, bottom: 30, left: 30})
const caption_text = "Average Sentiment Score"
const anno_text = "positive China coverage ↑"
const parser = d3.timeParse("%Y, %m")
const bisectDate = d3.bisector(function(d) { return d.Date; }).left
var formatTime = d3.timeFormat("%B, %Y")


class SentimentLineChart extends D3Component {
  initialize(node, props) {

    var tooltip = d3.select(node).append("div")
    .attr("class", "tooltip")
    .style("display", "none");


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
      .domain([0.3, 0.6])
      .range([height - margin.bottom, margin.top])

    const x = d3.scaleTime()
      .domain([new Date("2012"), new Date("2021")])
      .range([margin.left, width - margin.right])  

  const yAxis = g => g
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(d3.axisRight(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", -width/5.5)
      .attr("text-anchor", "start")
      .attr("font-size", "0.7rem")
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
       .y(function(d) { return y(d.Positive_Score) })
       )

       var focus = svg.append("g")
       .attr("class", "focus")
       .style("display", "none");

   focus.append("circle")
       .attr("r", 5);

   var tooltipDate = tooltip.append("div")
       .attr("class", "tooltip-date");

   var tooltipLikes = tooltip.append("div");
   tooltipLikes.append("span")
       .attr("class", "tooltip-title")
       .text("Average Sentiment: ");

   var tooltipLikesValue = tooltipLikes.append("span")
       .attr("class", "tooltip-likes");

   svg.append("rect")
       .attr("class", "overlay")
       .attr("width", width)
       .attr("height", height)
       .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
       .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
       .on("mousemove", mousemove);

   function mousemove() {
       var x0 = x.invert(d3.mouse(this)[0]),
           i = bisectDate(data, x0, 1),
           d0 = data[i - 1],
           d1 = data[i],
           d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
           
          focus.attr("transform", `translate(${x(d.Date)},${y(d.Positive_Score)})`);
          tooltip.attr("style", "left:" + (x(d.Date)+200) + "px;")
          tooltip.select(".tooltip-date").text(formatTime(d.Date));
          tooltip.select(".tooltip-likes").text(d.Positive_Score.toFixed(2));
   }
   function annotate() {

    svg // dashed line for acquistion date
       .append("line")
       .attr("x1", x(new Date("April, 2016")))
       .attr("y1", height)
       .attr("x2", x(new Date("April, 2016")))
       .attr("y2", 0)
       .attr("stroke-width", 1)
       .style("stroke-dasharray", ("3, 3"))
       .attr("stroke", "black");

    svg //annotation for acquistion date
       .append("text")
       .transition()
       .attr("x", x(new Date("March,2016")))
       .attr("y", y(0.28))
       .attr("text-anchor", "end")
       .text("Alibaba's Acquisition")
       .attr("class", "anno")
       .attr("font-size", "0.6rem")

    svg //soft line for neutral tone
       .append("line")
       .attr("x1", x(new Date("2012")))
       .attr("y1", y(0.5))
       .attr("x2", x(new Date("2021")))
       .attr("y2", y(0.5))
       .attr("opacity", 0.3)
       .attr("font-size", "0.6rem")
       .attr("stroke-width", 0.4)
       .attr("stroke", "black");
    svg //soft line annotation
        .append("text")
        .attr("y", y(0.505))
        .attr("x", x(new Date("2012")))
        .text("approximately neutral coverage")
        .attr("font-size", "0.7rem")
        .attr("opacity", 0.4)
        .attr("font-weight",'300') 

    svg //guide
        .append("text")
        .transition()
        .attr("x", x(new Date("2013")))
        .attr("y", y(0.58))
        .text(anno_text)
        .attr("font-size", "1.2rem")
        .attr("font-weight",'300')

    svg //umberlla
        .append("text")
        .transition()
        .attr("x", x(new Date("2014")))
        .attr("y", y(0.34))
        .text("Umbrella Movement")
        .attr("font-size", "0.7rem")
        .attr("font-weight",'300')

  
    svg //covid
        .append("text")
        .transition()
        .attr("x", x(new Date("November, 2019")))
        .attr("y", y(0.35))
        .text("Covid-19")
        .attr("font-size", "0.7rem")
        .attr("font-weight",'300')
        
      
      }
    annotate()




  }
}

module.exports = SentimentLineChart;
