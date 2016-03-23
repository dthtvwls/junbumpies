$.getJSON('/series.json', function (series) {

  var palette = new Rickshaw.Color.Palette();

  var graph = new Rickshaw.Graph({
    element: document.querySelector('#chart'),
    width: 900,
    height: 500,
    renderer: 'line',
    interpolation: 'basis',
    series: series
  });

  var x_axis = new Rickshaw.Graph.Axis.Time({ graph: graph });
  var y_axis = new Rickshaw.Graph.Axis.Y({
    graph: graph,
    orientation: 'left',
    element: document.getElementById('y_axis'),
    tickFormat: function (d) { return graph.series.length - d; }
  });

  graph.render();

  var legend      = new Rickshaw.Graph.Legend({ graph: graph, element: document.getElementById('legend') });
  var shelving    = new Rickshaw.Graph.Behavior.Series.Toggle({ graph: graph, legend: legend });
  var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({ graph: graph, legend: legend });
  var slider      = new Rickshaw.Graph.RangeSlider({ graph: graph, element: $('#slider') });
});
