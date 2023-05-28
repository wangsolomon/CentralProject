

function main() {

    var width = 2000;
    var height = 1200;
    var scaleFactor = 5; //bigger times
    var barHeight = 20;
    var distance = 0;
    var flag = 0;
    var current_intersection_id = 0;
    var text_width = 40;

    var group = d3.select("body")
        .append("svg")
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'chart');




    // 1 d3.json(json file)
    d3.json('./test.json').then(d => {
        render(d)
    });

    const render = data => {

        //bar wouldn't append g 
        const bar = group.select("g")
            .data(data)
            .enter()
            .append("g")
            .attr('transform', function (d) {
                console.log(data);
                return 'translate(' + d.default_width + ',' + d.default_height + ')';
            })




        // console.log(data.road[1].timeplan);




        for (let index_road = 0; index_road < data.road.length; index_road++) {
            // console.log(data.road[index_road]);
            for (let index_timeplan = 0; index_timeplan < data.road[index_road].timeplan.length; index_timeplan++) {
                console.log(data.road[index_road].timeplan);


                bar.append("g")
                    .append("rect").attr("width", function (d) {
                        d.road[index_road].timeplan[index_timeplan].g = +d.road[index_road].timeplan[index_timeplan].g;
                        d.road[index_road].timeplan[index_timeplan].pf = +d.road[index_road].timeplan[index_timeplan].pf;
                        d.road[index_road].timeplan[index_timeplan].pr = +d.road[index_road].timeplan[index_timeplan].pr;
                        return (d.road[index_road].timeplan[index_timeplan].g + d.road[index_road].timeplan[index_timeplan].pf + d.road[index_road].timeplan[index_timeplan].pr) * scaleFactor;
                    })
                    .attr("fill", "green")
                    .attr('height', barHeight)
                    .attr('class', 'pedestrian_flash')
                    .attr('transform', function (d) {
                        'translate(' + (text_width) * scaleFactor + ',0)';
                    });

            }

        }






    }