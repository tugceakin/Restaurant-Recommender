recommenderApp.factory('d3Service', function() {
    return {
        drawWordCloud: function(data) {
        var frequency_list = [];
        for (var key in data) {
           category = {};
          if (data.hasOwnProperty(key)) {
            category["text"] = key;
            category["size"] = data[key];
            frequency_list.push(category);
          }
        }

        var fill = d3.scale.category10();
        var w = document.getElementById('word-cloud').offsetWidth;
        var h = document.getElementById('word-cloud').offsetHeight;

        d3.layout.cloud().size([800, 500])
        .words(frequency_list)
        .padding(5)
        .rotate(function() { return 0; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

        console.log(w);

         function draw(words) {
              d3.select("#word-cloud").append("svg")
                  .attr("width", w)
                  .attr("height", 500)
                .append("g")
                  .attr("transform", "translate(" + w / 2 + "," + 500 / 2 + ")")
                .selectAll("text")
                  .data(words)
                .enter().append("text")
                  .style("font-size", function(d) { return d.size + "px"; })
                  .style("font-family", "Impact")
                  .style("fill", function(d, i) { return fill(i); })
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function(d) { return d.text; });
            }
        },

    drawBarGraph: function(dataset) {
        var keys = [];
        var values = [];
        for (var key in dataset) {
          if (dataset.hasOwnProperty(key)) {
            keys.push(key);
            values.push(dataset[key]);
          }
        }
        var w = 700;
        var h = 3600;
        var barPadding = 2;
        //Create SVG element
        var svg = d3.select(".box")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.selectAll("rect")
           .data(values)
           .enter()
           .append("rect")
           .attr("y", function(d, i) {
                return i * (h / keys.length);  //Bar width of 20 plus 1 for padding
            })
           .attr("x", function(d) {
                return 0;  //Height minus data value
            })
           .attr("height", h / keys.length - barPadding)
           .attr("width", function(d) {
                return d*14;
            })
           .attr("fill", "teal");

        svg.selectAll("text")
               .data(values)
               .enter()
               .append("text").text(function(d, i) {
                    return keys[i];
               }) .attr("y", function(d, i) {
                    return i * (h / keys.length) + 15;
               })
               .attr("x", function(d) {
                    return 0;
               })
                .attr("font-family", "sans-serif")
               .attr("font-size", "11px")
               .attr("fill", "white");
    }

    };
});