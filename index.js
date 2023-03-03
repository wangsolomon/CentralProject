
function main() {

  var width = 2000;
  var height = 40000;
  var scaleFactor = 5; //bigger times
  var barHeight = 20; 
  var distance = 0;  
  var flag = 0;

  var group = d3.select("body")
    .append("svg")
    .attr('width', width)
    .attr('height', height);

    // 1 d3.json(json file)
  d3.json('./sample.json').then(data => {
    data.forEach(d => {
      d.pedestrian_red = +d.pedestrian_red;
      d.pedestrian_flash = +d.pedestrian_flash;
      d.green = +d.green;
      d.yellow = +d.yellow;
      d.red = +d.red;
      d.r_distance = +d.r_distance;

      console.log(d.pedestrian_red);

    });
    render(data)
  })

  const render = data => {
    const bar = group.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr('transform', function (d, i) {

        var currentd;
        currentd = distance + (i * barHeight);
        distance = d.r_distance + distance;
        // console.log(i);
        // console.log(distance);

        return 'translate(0,' + currentd + ')';
      });

      
    
    bar.append("rect").attr("width", function (d) {
      return (d.green+d.pedestrian_red+d.pedestrian_flash) * scaleFactor;
    })
      .attr("fill", "green")
      .attr('height', barHeight )
      .attr('class', 'pedestrian_flash');
    
    
     bar.append('svg:image')
      .attr('x','0')
      .attr('y',barHeight+1)
      .attr('width',function (d) {
        return (d.green+d.pedestrian_red+d.pedestrian_flash) * scaleFactor;
      })
      .attr(
        "xlink:href", "https://1-notes.com/wp-content/uploads/2022/03/Shift%E3%82%AD%E3%83%BC%E3%82%92%E6%8A%BC%E3%81%97%E3%81%AA%E3%81%8C%E3%82%89%E6%AD%A3%E6%96%B9%E5%BD%A2%E3%82%92%E6%8F%8F%E3%81%8F.png"
  
      );

    bar.append('text')
      .attr('x', function (d) {
        return ((d.green+d.pedestrian_red+d.pedestrian_flash) * scaleFactor / 2);
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('fill', 'black')
      .text(function (d) { return String((d.green+d.pedestrian_red+d.pedestrian_flash)); });







    //

    bar.append("rect").attr("width", function (d) {
      if (d.red != null)
        return d.red * scaleFactor;
    })
      .attr("fill", "red")
      .attr('height', barHeight ).attr('class', 'green')
      .attr('transform', function (d) {
        return 'translate(' + (d.green+d.pedestrian_red+d.pedestrian_flash) * scaleFactor + ',0)';
      })



    bar.append('text')
      .attr('x', function (d) {
        return ((d.green+d.pedestrian_red+d.pedestrian_flash)* scaleFactor);
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('fill', 'black')
      .text(function (d) { return String(d.red); });


  }





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