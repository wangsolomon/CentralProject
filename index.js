
function test() {
  var timesvalue = document.getElementById("times").value;
  // for (let index = 0; index < timesvalue; index++) {
  //   var txt1 = `<input type="checkbox" id="${index}" name="showcolor" ></input>`;

  //   // <label for="times">重複次數:</label>
  //   // 
  //   var txt2 = `<p>顏色-${index}。</p>`;
  //   var txt3 = `<label for="showcolor">第+${index}+次</label>`;

  //   document.createElement("addcheckbox").append(txt1, txt2, txt3);
  //   $("<input type="checkbox" id="${index}" name="showcolor" ></input>").appendto("body")
  // } 

  main();


}

function main() {

  var width = 2000;
  var height = 40000;
  var scaleFactor = 5; //bigger times
  var barHeight = 20;
  var distance = 0;
  var flag = 0;
  var current_intersection_id = 0;
  var text_width = 40;




  var group = d3.select("body")
    .append("svg")
    .attr('width', width)
    .attr('height', height);

  // 1 d3.json(json file)
  d3.json('./sample1.json').then(data => {
    data.forEach(d => {
      d.intersection_id = +d.intersection_id;
      d.pedestrian_red = +d.pedestrian_red;
      d.pedestrian_flash = +d.pedestrian_flash;
      d.green = +d.green;
      d.yellow = +d.yellow;
      d.red = +d.red;
      d.r_distance = +d.r_distance;

      // console.log(d.pedestrian_red);

    });
    render(data)
  })

  const render = data => {

    const bar = group.selectAll("g")
      .data(data.filter(function (d) {
        if (current_intersection_id == 0) {
          current_intersection_id = d.intersection_id;
          return d;
        } else if (current_intersection_id != d.intersection_id) {
          current_intersection_id = d.intersection_id;
          return d;
        }
      }))
      .enter().append("g")
      .attr('transform', function (d, i) {

        var current_y = 0;
        var current_x = 100;

        current_y = distance + (d.intersection_id * barHeight);
        distance = d.r_distance + distance;
        current_intersection_id = d.intersection_id;


        // console.log(i);  
        // console.log(distance);

        return 'translate(' + current_x + ',' + current_y + ')';
      });






    bar.append("rect").attr("width", function (d) {
      return (text_width) * scaleFactor;
    })
      .attr("fill", "white")
      .attr('height', barHeight)


    bar.append('text')
      .attr('x', function (d) {
        return ((text_width / 2) * scaleFactor);
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('fill', 'black')
      .text(function (d) { return String(d.road_name); });



    bar.append("rect").attr("width", function (d) {
      return (d.green + d.pedestrian_red + d.pedestrian_flash) * scaleFactor;
    })
      .attr("fill", "green")
      .attr('height', barHeight)
      .attr('class', 'pedestrian_flash')
      .attr('transform', function (d) {
        return 'translate(' + (text_width) * scaleFactor + ',0)';
      });

    // bar.append('svg:image')
    //   .attr('x', '0')
    //   .attr('y', barHeight + 1)
    //   .attr('width', function (d) {
    //     return (d.green + d.pedestrian_red + d.pedestrian_flash) * scaleFactor;
    //   })
    //   .attr(
    //     "xlink:href", "https://1-notes.com/wp-content/uploads/2022/03/Shift%E3%82%AD%E3%83%BC%E3%82%92%E6%8A%BC%E3%81%97%E3%81%AA%E3%81%8C%E3%82%89%E6%AD%A3%E6%96%B9%E5%BD%A2%E3%82%92%E6%8F%8F%E3%81%8F.png"

    //   );

    bar.append('text')
      .attr('x', function (d) {
        return ((text_width + (+d.green + d.pedestrian_red + d.pedestrian_flash) / 2) * scaleFactor);
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('fill', 'black')
      .text(function (d) { return String((d.green + d.pedestrian_red + d.pedestrian_flash)); });







    //

    bar.append("rect").attr("width", function (d) {
      if (d.red != null)
        return d.red * scaleFactor;
    })
      .attr("fill", "red")
      .attr('height', barHeight).attr('class', 'green')
      .attr('transform', function (d) {
        return 'translate(' + (text_width + d.green + d.pedestrian_red + d.pedestrian_flash) * scaleFactor + ',0)';
      })



    bar.append('text')
      .attr('x', function (d) {
        return ((text_width + d.green + d.pedestrian_red + d.pedestrian_flash) * scaleFactor);
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