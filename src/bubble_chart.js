var nodess = [];
var clusters = new Array(3);
var rS;

var formatDate = d3.timeFormat("%B %d, %Y");
var formatDecimal = d3.format(".2f");
var formatInteger = d3.format(".0f");
var parseTime = d3.timeParse("%d/%m/%Y");
var formatComma = d3.format(",.0f");

function bubbleChart() {
  // Constants for sizing
  var width = document.documentElement.clientWidth * 0.75;
  var width_pane = width/6;
  var adj = width/12;
  var height = document.documentElement.clientHeight * 0.9;
  var nodes = [];


  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('tooltipID', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var yearCenters = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: width_pane + (width_pane/2), y: height / 2 },
    2014: { x: width_pane + 2*(width_pane/2), y: height / 2 },
    2015: { x: width_pane + 3*(width_pane/2), y: height / 2 },
    2016: { x: width_pane + 4*(width_pane/2), y: height / 2 },
    2017: { x: width_pane + 5*(width_pane/2), y: height / 2 },
    2018: { x: (width * 3)/4, y: height / 2 }
  };

  var year2012 = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: (height * 3)/4, y: height / 2 },
    2014: { x: (height * 3)/4, y: height / 2 },
    2015: { x: (height * 3)/4, y: height / 2 },
    2016: { x: (height * 3)/4, y: height / 2 },
    2017: { x: (height * 3)/4, y: height / 2 },
    2018: { x: (height * 3)/4, y: height / 2 }
  };

  var year2013 = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: width_pane + (width_pane/2), y: height / 2 },
    2014: { x: (height * 3)/4, y: height / 2 },
    2015: { x: (height * 3)/4, y: height / 2 },
    2016: { x: (height * 3)/4, y: height / 2 },
    2017: { x: (height * 3)/4, y: height / 2 },
    2018: { x: (height * 3)/4, y: height / 2 }
  };

  var year2014 = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: width_pane + (width_pane/2), y: height / 2 },
    2014: { x: width_pane + 2*(width_pane/2), y: height / 2 },
    2015: { x: (width * 3)/4, y: height / 2 },
    2016: { x: (width * 3)/4, y: height / 2 },
    2017: { x: (width * 3)/4, y: height / 2 },
    2018: { x: (width * 3)/4, y: height / 2 }
  };

  var year2015 = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: width_pane + (width_pane/2), y: height / 2 },
    2014: { x: width_pane + 2*(width_pane/2), y: height / 2 },
    2015: { x: width_pane + 3*(width_pane/2), y: height / 2 },
    2016: { x: (width * 3)/4, y: height / 2 },
    2017: { x: (width * 3)/4, y: height / 2 },
    2018: { x: (width * 3)/4, y: height / 2 }
  };

  var year2016 = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: width_pane + (width_pane/2), y: height / 2 },
    2014: { x: width_pane + 2*(width_pane/2), y: height / 2 },
    2015: { x: width_pane + 3*(width_pane/2), y: height / 2 },
    2016: { x: width_pane + 4*(width_pane/2), y: height / 2 },
    2017: { x: (width * 3)/4, y: height / 2 },
    2018: { x: (width * 3)/4, y: height / 2 }
  };

  var year2017 = {
    2012: { x: width_pane, y: height / 2 },
    2013: { x: width_pane + (width_pane/2), y: height / 2 },
    2014: { x: width_pane + 2*(width_pane/2), y: height / 2 },
    2015: { x: width_pane + 3*(width_pane/2), y: height / 2 },
    2016: { x: width_pane + 4*(width_pane/2), y: height / 2 },
    2017: { x: width_pane + 5*(width_pane/2), y: height / 2 },
    2018: { x: (width * 3)/4, y: height / 2 }
  };

  var year2018 = {
    2012: { x: -height, y: -height},
    2013: { x: -height, y: -height},
    2014: { x: -height, y: -height},
    2015: { x: -height, y: -height},
    2016: { x: -height, y: -height},
    2017: { x: -height, y: -height},
    2018: { x: height/2, y: height / 2 }
  };

  // X locations of the year titles.
  var yearsTitleX = {
    2012: width_pane - adj,
    2013: width_pane + (width_pane/2) - adj,
    2014: width_pane + 2*(width_pane/2) - adj,
    2015: width_pane + 3*(width_pane/2) - adj,
    2016: width_pane + 4*(width_pane/2) - adj,
    2017: width_pane + 5*(width_pane/2) - adj,
    2018: (width * 3)/4  
  };

  var yearsTitleX_step1 = {
    2012: width_pane - adj 
  };

  var yearsTitleX_step1a = {
    2012: width_pane - adj,
    2013: width_pane + (width_pane/2) - adj
  };

  var yearsTitleX_step2 = {
    2012: width_pane - adj,
    2013: width_pane + (width_pane/2) - adj,
    2014: width_pane + 2*(width_pane/2) - adj
  };

  var yearsTitleX_step2a = {
    2012: width_pane - adj,
    2013: width_pane + (width_pane/2) - adj,
    2014: width_pane + 2*(width_pane/2) - adj,
    2015: width_pane + 3*(width_pane/2) - adj
  };

  var yearsTitleX_step3 = {
    2012: width_pane - adj,
    2013: width_pane + (width_pane/2) - adj,
    2014: width_pane + 2*(width_pane/2) - adj,
    2015: width_pane + 3*(width_pane/2) - adj,
    2016: width_pane + 4*(width_pane/2) - adj
  };

  var yearsTitleX_step4 = {
    2012: width_pane - adj,
    2013: width_pane + (width_pane/2) - adj,
    2014: width_pane + 2*(width_pane/2) - adj,
    2015: width_pane + 3*(width_pane/2) - adj,
    2016: width_pane + 4*(width_pane/2) - adj,
    2017: width_pane + 5*(width_pane/2) - adj,
    2018: (width * 3)/4  
  };

  var yearsTitleX_step5 = {
    2018: width/2
  };

  // @v4 strength to apply to the position forces
  var forceStrength = 0.03;
  var forceStrength2 = 0.01;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;


  function charge(d) {
    return -Math.pow(d.radius, 2.0) * forceStrength;
  }

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.
  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    //.force('cluster', forceCluster)
    .on('tick', ticked);

  var simulation2 = d3.forceSimulation()
    .velocityDecay(0.1)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    //.force('cluster', forceCluster)
    .on('tick', ticked);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  simulation.stop();
  simulation2.stop();

  // Nice looking colors - no reason to buck the trend
  // @v4 scales now have a flattened naming scheme
  var fillColor = d3.scaleOrdinal()
    .domain(['negative', 'neutral', 'positive', 'featured'])
    .range(['#F8766D', '#DCDCDC ', '#00FBC4', '#F8766D']);
  
  function createNodes(rawData) {

    var maxAmount = d3.max(rawData, function (d) { return +d.pop_score; });

    var radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, width*0.05])
      .domain([0, maxAmount]);

    rS = radiusScale;

    var myNodes = rawData.map(function (d) {
      if (!clusters[d.cluster] || (radiusScale(+d.pop_score) > clusters[d.cluster].radius)) clusters[d.cluster] = d;
      return {
        id: d.ids,
        radius: radiusScale(+d.pop_score),
        value: +d.pop_score,
        name: d.username,
        org: d.text,
        group: d.sentiment,
        year: d.year,
        date: parseTime(d.time),
        cluster: +d.cluster,
        followers: d.followers_count,
        likes: d.fave,
        retweets: d.rt,
        sent_score: d.score,
        x: Math.random() * 900,
        y: Math.random() * 800
      };

    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });
    return myNodes;
  }
  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);
    nodess = nodes;
    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    bubbles = bubbles.merge(bubblesE);


    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    simulation.nodes(nodes);

    groupBubbles();

    var translate_x = 200;
    var translate_y = 100;
    var color_legends = svg.append("g")
        .attr("class", "color-legend");

    color_legends.append("circle")
        .attr("class", "legend")
        .attr("r", 6)
        .attr("cx", width - translate_x)
        .attr("cy", 20)
        .attr("fill-opacity", 1)
        .style("fill", "#00FBC4");

    color_legends.append("text")
        .attr("y", 25)
        .attr("x", width - translate_x*0.8)
        .style("fill", "#00FBC4")
        .text("Positive")

    color_legends.append("circle")
        .attr("class", "legend")
        .attr("r", 6)
        .attr("cx", width - translate_x)
        .attr("cy", 40)
        .attr("fill-opacity", 1)
        .style("fill", "#DCDCDC");

    color_legends.append("text")
        .attr("y", 45)
        .attr("x", width - translate_x*0.8)
        .style("fill", "#DCDCDC")
        .text("Neutral");

    color_legends.append("circle")
        .attr("class", "legend")
        .attr("r", 6)
        .attr("cx", width - translate_x)
        .attr("cy", 60)
        .attr("fill-opacity", 1)
        .style("fill", "#F8766D");

    color_legends.append("text")
        .attr("y", 65)
        .attr("x", width - translate_x*0.8)
        .style("fill", "#F8766D")
        .text("Negative");

    var size_legends = svg.append("g")
        .attr("class", "size-legend")

    size_legends.append("circle") //10 pop
        .attr("class", "legend")
        .attr("r", size_legend(10))
        .attr("cx", width - translate_x)
        .attr("cy", translate_y + size_legend(10));

    size_legends.append("text")
        .attr("y", translate_y  + size_legend(10) + 5)
        .attr("x", width - translate_x*0.8)
        .style("fill", "black")
        .text("10 likes and retweets")

    size_legends.append("circle") // 50 pop score
        .attr("class", "legend")
        .attr("r", size_legend(50))
        .attr("cx", width - translate_x)
        .attr("cy", translate_y + size_legend(50));

    size_legends.append("text")
        .attr("y", translate_y + size_legend(50)*2)
        .attr("x", width - translate_x*0.8)
        .style("fill", "black")
        .text("50 likes and retweets")

    size_legends.append("circle") // 100 pop score
        .attr("class", "legend")
        .attr("r", size_legend(100))
        .attr("cx", width - translate_x)
        .attr("cy", translate_y + size_legend(100));

    size_legends.append("text")
        .attr("y", translate_y + size_legend(100)*2)
        .attr("x", width - translate_x*0.8)
        .style("fill", "black")
        .text("100 likes and retweets")

    size_legends.append("circle") // 500 pop score
        .attr("class", "legend")
        .attr("r", size_legend(500))
        .attr("cx", width - translate_x)
        .attr("cy", translate_y + size_legend(500));

    size_legends.append("text")
        .attr("y", translate_y + size_legend(500)*2)
        .attr("x", width - translate_x*0.8)
        .style("fill", "black")
        .text("500 likes and retweets")

  };

  function size_legend(followers) {
    return rS(followers);
  };

  function forceCluster(alpha) {
    for (var i = 0, n = nodess.length, node, cluster, k = alpha * 1; i < n; ++i) {
      node = nodess[i];
      cluster = clusters[node.cluster];
      node.vx -= (node.x - cluster.x) * k;
      node.vy -= (node.y - cluster.y) * k;
    }
  }
  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
  }

  /*
   * Provides a x value for each node to be used with the split by year
   * x force.
   */
  function nodeYearPos(d) {
    return yearCenters[d.year].x;
  }

  function step1Pos(d) {
    return year2012[d.year].x;
  }

  function step1aPos(d) {
    return year2013[d.year].x;
  }

  function step2Pos(d) {
    return year2014[d.year].x;
  }

  function step2aPos(d) {
    return year2015[d.year].x;
  }

  function step3Pos(d) {
    return year2016[d.year].x;
  }

  function step4Pos(d) {
    return year2017[d.year].x;
  }

  function step5Pos(d) {
    return year2018[d.year].x;
  }

  function groupBubbles() {
    hideYearTitles();

    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));

    simulation.alpha(1).restart();
  }

  function groupBubbles2() {
    hideYearTitles();

    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));

    simulation.alpha(0.8).restart();
  }


  function splitBubbles() {
    showYearTitles();
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));

    simulation.alpha(1).restart();
  }

  function splitBubbles1() {
    hideYearTitles();
    showYearTitles2();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step1Pos));

    simulation.alpha(1).restart();
  }

  function splitBubbles1a() {
    hideYearTitles();
    showYearTitles2a();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step1aPos));

    simulation.alpha(1).restart();
  }

  function splitBubbles2() {
    hideYearTitles();
    showYearTitles3();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step2Pos));

    simulation.alpha(1).restart();
  }

  function splitBubbles2a() {
    hideYearTitles();
    showYearTitles3a();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step2aPos));

    simulation.alpha(1).restart();
  }

  function splitBubbles3() {
    hideYearTitles();
    showYearTitles4();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step3Pos));

    simulation.alpha(1).restart();
  }

  function splitBubbles4() {
    hideYearTitles();
    showYearTitles5();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step4Pos));

    simulation.alpha(1).restart();
  }

  function splitBubbles5() {
    hideYearTitles();
    showYearTitles6();
    simulation.force('y', d3.forceY().strength(forceStrength).y(step5Pos));

    simulation.alpha(1).restart();
  }

  /*
   * Hides Year title displays.
   */
  function hideYearTitles() {
    svg.selectAll('.year').remove();
  }

  /*
   * Shows Year title displays.
   */
  function showYearTitles() {
    var yearsData = d3.keys(yearsTitleX);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX[d]; })
      .attr('x', width*0.7)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function showYearTitles2() {
    var yearsData = d3.keys(yearsTitleX_step1);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX_step1[d]; })
      .attr('x', width*0.65)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; }) 
      .attr('fill', '#2C4DAD');
  }

  function showYearTitles2a() {
    var yearsData = d3.keys(yearsTitleX_step1a);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX_step1a[d]; })
      .attr('x', width*0.65)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }


  function showYearTitles3() {
    var yearsData = d3.keys(yearsTitleX_step2);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX_step2[d]; })
      .attr('x', width*0.65)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; })
      .attr('fill', function (d) { 
        if (d == '2014') return '#2C4DAD'});
  }


  function showYearTitles3a() {
    var yearsData = d3.keys(yearsTitleX_step2a);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX_step2a[d]; })
      .attr('x', width*0.65)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }


  function showYearTitles4() {
    var yearsData = d3.keys(yearsTitleX_step3);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX_step3[d]; })
      .attr('x', width*0.65)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; })
      .attr('fill', function (d) { 
        if (d == '2016') return '#2C4DAD'});;
  }

  function showYearTitles5() {
    var yearsData = d3.keys(yearsTitleX_step4);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('y', function (d) { return yearsTitleX_step4[d]; })
      .attr('x', width*0.65)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; })
      .attr('fill', function (d) { 
        if (d == '2017') return '#2C4DAD'});
  }

  function showYearTitles6() {
    var yearsData = d3.keys(yearsTitleX_step5);
    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('x', function (d) { return yearsTitleX_step5[d]; })
      .attr('y', height*0.95)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; })
      .attr('fill', function (d) { 
        if (d == '2018') return '#2C4DAD'});
  }


  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('fill', '#61a8ff')
                   .attr('stroke', '#0069ea');

    var content = '<span class="value">Username </span><span class="name">@' +
                  d.name + '</span> (' + formatComma(d.followers) + ' followers)' +
                  ' tweeted on <span class="name">' + formatDate(d.date) + '</span>' +
                  ' with a sentiment score of <span class="name">' + formatDecimal(d.sent_score) + '</span><br><br>' +
                  '<span>Likes: ' + d.likes + '</span><br>' +
                  '<span>Retweets: ' + d.retweets + '</span>';
    var tweetID = d.id;
    console.log(tweetID)
    tooltip.showTooltip(content, d3.event, tweetID);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('fill', d3.rgb(fillColor(d.group)))
      .attr('stroke', 'white');

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by year" modes.
   *
   * displayName is expected to be a string and either 'year' or 'all'.
   */
  chart.toggleDisplay = function (displayName) {
    if (displayName === 'year') {
      splitBubbles();
    } 
    else if (displayName === 'step-1') {
      splitBubbles1();
    }
    else if (displayName === 'step-1a') {
      splitBubbles1a();
    }
    else if (displayName === 'step-2') {
      splitBubbles2();
    }
    else if (displayName === 'step-2a') {
      splitBubbles2a();
    }
    else if (displayName === 'step-3') {
      splitBubbles3();
    }
    else if (displayName === 'step-4') {
      splitBubbles4();
    }
    else if (displayName === 'step-5') {
      splitBubbles5();
    }
    else if (displayName === 'last') {
      groupBubbles2();
    }
    else {
      groupBubbles();
    }
  };


  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('data/allposts5.csv', display);

// setup the buttons.
setupButtons();

