// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var margin = {
    top: 0,
    right: 40,
    bottom: 60,
    left: 100
  };
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;
  
  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
  
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Import Data
  d3.csv("data.csv", function (error, healthData) {
    if (error) throw error;
  
    // Parse Data/Cast as numbers
    healthData.forEach(function (data) {
      data.income = parseInt(data.income);
      data.obesity = parseInt(data.obesity);
    });
  
    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([12000, d3.max(healthData, d => d.income+1000)])
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([15, d3.max(healthData, d => d.obesity+5)])
      .range([height, 50]);
  
    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    chartGroup.append("g")
      .call(leftAxis);
  
     // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "green")
    .attr("opacity", ".65");
  
    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(d =>
        `${d.state}<br> Median Income: $${d.income}<br>Obese (%): ${d.obesity}`
      );
  
    // Create tooltip in the chart
    chartGroup.call(toolTip);
  
    // Create event listeners to display and hide the tooltip
    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
      })
      // onmouseout event
      .on("mouseout", function (data, index) {
        toolTip.hide(data);
      });
  
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obese (%)");
  
    chartGroup.append("text")
      .attr("transform", `translate(${width/2.5}, ${height + margin.top + 50})`)
      .attr("class", "axisText")
      .text("Median Income per Household");
  });
  