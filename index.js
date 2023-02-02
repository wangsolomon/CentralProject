
function main() {

  var width = 2000;
  var scaleFactor = 10;
  var barHeight = 20;
  var distance = 0;
  var flag = 0;

  var group = d3.select("body")
    .append("svg")
    .attr('width', width)
    .attr('height', 40000);

  const render = data => {
    const bar = group.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr('transform', function (d, i) {

        var currentd;
        currentd = distance + (i * barHeight);
        distance = d.roadDistance + distance;
        console.log(i);
        console.log(distance);

        return 'translate(0,' + currentd + ')';
      });

    //
    bar.append("rect").attr("width", function (d) {
      return d.firstSecond * scaleFactor;
    })
      .attr("fill", "blue")
      .attr('height', barHeight - 1)
      .attr('class', 'firstSecond')
      .attr('opacity', '0.5');

    bar.append('text')
      .attr('x', function (d) {
        return (d.firstSecond * scaleFactor / 2);
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('fill', 'black')
      .text(function (d) { return String(d.firstSecond); });





    //

    bar.append("rect").attr("width", function (d) {
      if (d.secondSecond != null)
        return d.secondSecond * scaleFactor;
    })
      .attr("fill", "red")
      .attr('height', barHeight - 1).attr('class', 'secondSecond')
      .attr('transform', function (d) {
        return 'translate(' + d.firstSecond * scaleFactor + ',0)';
      })
      .attr('opacity', '0.5');


    bar.append('text')
      .attr('x', function (d) {
        return ((d.secondSecond  / 2+d.firstSecond)* scaleFactor);
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('fill', 'black')
      .text(function (d) { return String(d.secondSecond); });


  }


  d3.csv('./sample.csv').then(data => {
    data.forEach(d => {
      d.roadDistance = +d.roadDistance;
      d.firstSecond = +d.firstSecond;
      d.secondSecond = +d.secondSecond;


    });
    render(data)
  })



  // var g = d3.select("body")
  //   .append("svg")
  //   .attr('width', width)
  //   .attr('height', barHeight * dataset.length);

  // var bar = g.selectAll("g")
  //   .data(dataset)
  //   .enter().append("g")
  //   .attr('transform', function (d, i) {
  //     return 'translate(0,' + i * barHeight + ')';
  //   });



  // bar.append("rect").attr("width", function (d) {
  //   return d * scaleFactor;
  // })
  //   .attr("fill", "blue")
  //   .attr('height', barHeight - 1);

  // bar.append('text')
  //   .attr('x', function (d) {
  //     return (d * scaleFactor);
  //   })
  //   .attr('y', barHeight / 2)
  //   .attr('dy', '.35em')
  //   .text(function (d) { return d; });


}