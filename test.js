

function main() {

    var width = 2000;
    var height = 1200;
    var scaleFactor = 5; //bigger times
    var barHeight = 10;
    var distance = 0;
    var flag = 0;
    var current_intersection_id = 0;
    var text_width = 40;
    var current_y = 0;
    var current_x = 100;
    var barwidth;
    var group;

    // 1 d3.json(json file)
    d3.json('./test.json').then(data => {

        // console.log(d.last_road_distance);
        // console.log(typeof data.road[1].timeplan[0].g);
        group = d3.select('body')
            .append("svg")
            .attr('width', data.default_width)
            .attr('height', data.default_height)
            .attr('id', 'chart');

        // var timeplans = data.road[0].timeplan;
        // console.log(timeplans);
        render(data.road)
    })

    const render = data => {
        console.log(data[0]);
        //bar wouldn't append g 

        const bar = group.selectAll("g")
            .data(data)
            .enter()
            .append("g");





        for (let index_road = 0; index_road < data.length; index_road++) {
            current_x = 100;
            current_y += data[index_road].last_road_distance * scaleFactor;
            bar.append('text')
                .attr('transform', function (d, i) {

                    // console.log(d.last_road_distance);

                    return 'translate(' + 0 + ',' + current_y + 10 + ')';
                })
                .attr('font-size','10px')
                // .attr('dy', '.35em')
                .attr('fill', 'black')
                .text(function (d) { return String(data[index_road].crossroad_name); });
                

            for (let index_timeplan = 0; index_timeplan < data[index_road].timeplan.length; index_timeplan++) {






                bar.append("rect").attr("width", function (d) {
                    var barwidth = data[index_road].timeplan[index_timeplan].g + data[index_road].timeplan[index_timeplan].pf + data[index_road].timeplan[index_timeplan].pr;
                    return (barwidth) * scaleFactor;
                })
                    .attr("fill", "green")
                    .attr('height', barHeight)
                    .attr('transform', function (d, i) {

                        // console.log(d.last_road_distance);

                        return 'translate(' + current_x + ',' + current_y + ')';
                    })

                console.log('test' + current_x);
                current_x += (data[index_road].timeplan[index_timeplan].g + data[index_road].timeplan[index_timeplan].pf + data[index_road].timeplan[index_timeplan].pr) * scaleFactor;
                console.log('after' + current_x)


                bar.append("rect").attr("width", function (d) {
                    var barwidth = data[index_road].timeplan[index_timeplan].ar;
                    return (barwidth) * scaleFactor;
                })
                    .attr("fill", "red")
                    .attr('height', barHeight)
                    .attr('transform', function (d, i) {

                        // console.log(d.last_road_distance);

                        return 'translate(' + current_x + ',' + current_y + ')';
                    })
                console.log(current_x);
                current_x += data[index_road].timeplan[index_timeplan].ar * scaleFactor;

            }

        }

        // console.log(data.road[1].timeplan);











    }
}