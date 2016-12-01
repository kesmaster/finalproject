//Initialize variables for color and boundary buttons
var change = 0,
    boundary = 0;

var width = 1125,
    height = 1100;

var formatNumber = d3.format(",d");
    
var projection = d3.geo.albers()
    .center([10, 50])
    .rotate([-15, 2, 0])
    .parallels([38, 69])
    .scale(1200)
    .translate([width-300, height-500]);

var path = d3.geo.path()
    .projection(projection);
    
var color = d3.scale.threshold()
    .domain([1, 10, 50, 100, 500, 1000, 2000, 5000])
    .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);

    
// A position encoding for the key only.
var x = d3.scale.linear()
    .domain([0, 5100])
    .range([0, 480]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(13)
    .tickValues(color.domain())
    .tickFormat(function(d) { return d >= 100 ? formatNumber(d) : null; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(440,40)");


/*g.selectAll("rect")
    .data(color.range().map(function(d, i) {
      return {
        x0: i ? x(color.domain()[i - 1]) : x.range()[0],
        x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
        z: d
      };
    }))
    .enter().append("rect")
    .attr("height", 9)
    .attr("x", function(d) { return d.x0; })
    .attr("width", function(d) { return d.x1 - d.x0; })
    .style("fill", function(d) { return d.z; });

g.call(xAxis).append("text")
    .attr("class", "caption")
    .attr("y", -6)
    .text("Population per square mile");  //code for scale, took out to make it look better*/
    

d3.json("eu.json", function(error, eu) {
  if (error) throw error;
     var tooltip = d3.select("body").append("countries")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
   //declare boolean for age selection
     var firstStateData = new Object();
     var all = true;
     var older = false;
     var middle = false;
     var youngest = false;
     var currentCountry = "";
     var currentLang = "";
     var toolString="";
  console.log(eu);

  svg.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(eu, eu.objects.world).features)
    .enter().append("path")
    .attr("fill", '#fff')
    .attr("d", path)
    .append("title");

    
  // Draw county borders.
  svg.append("path")
      .datum(topojson.mesh(eu, eu.objects.world))
      .attr("class", "mesh")
      .attr("d", path);
    
    //enable tooltip
    svg.selectAll('.countries')
        .data(topojson.feature(eu, eu.objects.world).features)
        .enter()
        .append('path')
        .attr('d', path)
        .style("fill", '#0080ff')
        //.attr("opacity", 0)
        .on("mouseover", function(d) {
        
          parseJson(d);
        
          var currentState = this;
          d3.select(this).style('fill-opacity', 0.5);
               
          tooltip.transition()
               .duration(200)
               .style("opacity", 1.0)
               
          tooltip.html(toolString)
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
      })    
        .on("mouseout", function(d) {
        
          var currentState = this;
          d3.select(this).style('fill-opacity', 1);
       
          tooltip.transition()
               .duration(50)
               .style("opacity", 0);
               toolString = "" //reset tooltip string
      });
    
    
    function parseJson(d){
       
       //new hash table
       var hashData = new Object();
       //save country name locally
       currentCountry = d.properties.NAME;
       //set data into hash
       hashData["allBulgarian"] = d.properties.allBulgarian,
       hashData["allCroatian"]= d.properties.allCroatian,
       hashData["allCzech"]= d.properties.allCzech,
       hashData["allDanish"]= d.properties.allDanish,
       hashData["allDutch"]= d.properties.allDutch,
       hashData["allEnglish"]= d.properties.allEnglish,
       hashData["allEstonian"]= d.properties.allEstonian,
       hashData["allFinnish"]= d.properties.allFinnish,
       hashData["allFrench"]= d.properties.allFrench,
       hashData["allGerman"]= d.properties.allGerman,
       hashData["allGreek"]= d.properties.allGreek,
       hashData["allHungarian"]= d.properties.allHungarian,
       hashData["allIrish"]= d.properties.allIrish,
       hashData["allItalian"]= d.properties.allItalian,
       hashData["allLatvian"]= d.properties.allLatvian,
       hashData["allLithuanian"]= d.properties.allLithuanian,
       hashData["allLuxembourgish"]= d.properties.allLuxembourgish,
       hashData["allMaltese"]= d.properties.allMaltese,
       hashData["allPolish"]= d.properties.allPolish,
       hashData["allPortugese"]= d.properties.allPortugese,
       hashData["allRomanian"]= d.properties.allRomanian,
       hashData["allSlovak"]= d.properties.allSlovak,
       hashData["allSlovenian"]= d.properties.allSlovenian,
       hashData["allSpanish"]= d.properties.allSpanish,
       hashData["allSwedish"]= d.properties.allSwedish,
       hashData["allRussian"]= d.properties.allRussian,
       hashData["allCatalan"]= d.properties.allCatalan,
       hashData["olderBulgarian"]= d.properties.olderBulgarian,
       hashData["olderCroatian"]= d.properties.olderCroatian,
       hashData["olderCzech"]= d.properties.olderCzech,
       hashData["olderDanish"]= d.properties.olderDanish,
       hashData["olderDutch"]= d.properties.olderDutch,
       hashData["olderEnglish"]= d.properties.olderEnglish,
       hashData["olderEstonian"]= d.properties.olderEstonian,
       hashData["olderFinnish"]= d.properties.olderFinnish,
       hashData["olderFrench"]= d.properties.olderFrench,
       hashData["olderGerman"]= d.properties.olderGerman,
       hashData["olderGreek"]= d.properties.olderGreek,
       hashData["olderHungarian"]= d.properties.olderHungarian,
       hashData["olderIrish"]= d.properties.olderIrish,
       hashData["olderItalian"]= d.properties.olderItalian,
       hashData["olderLatvian"]= d.properties.olderLatvian,
       hashData["olderLithuanian"]= d.properties.olderLithuanian,
       hashData["olderLuxembourgish"]= d.properties.olderLuxembourgish,
       hashData["olderMaltese"]= d.properties.olderMaltese,
       hashData["olderPolish"]= d.properties.olderPolish,
       hashData["olderPortugese"]= d.properties.olderPortugese,
       hashData["olderRomanian"]= d.properties.olderRomanian,
       hashData["olderSlovak"]= d.properties.olderSlovak,
       hashData["olderSlovenian"]= d.properties.olderSlovenian,
       hashData["olderSpanish"]= d.properties.olderSpanish,
       hashData["olderSwedish"]= d.properties.olderSwedish,
       hashData["olderRussian"]= d.properties.olderRussian,
       hashData["olderCatalan"]= d.properties.olderCatalan,
       hashData["middleBulgarian"]= d.properties.middleBulgarian,
       hashData["middleCroatian"]= d.properties.middleCroatian,
       hashData["middleCzech"]= d.properties.middleCzech,
       hashData["middleDanish"]= d.properties.middleDanish,
       hashData["middleDutch"]= d.properties.middleDutch,
       hashData["middleEnglish"]= d.properties.middleEnglish,
       hashData["middleEstonian"]= d.properties.middleEstonian,
       hashData["middleFinnish"]= d.properties.middleFinnish,
       hashData["middleFrench"]= d.properties.middleFrench,
       hashData["middleGerman"]= d.properties.middleGerman,
       hashData["middleGreek"]= d.properties.middleGreek,
       hashData["middleHungarian"]= d.properties.middleHungarian,
       hashData["middleIrish"]= d.properties.middleIrish,
       hashData["middleItalian"]= d.properties.middleItalian,
       hashData["middleLatvian"]= d.properties.middleLatvian,
       hashData["middleLithuanian"]= d.properties.middleLithuanian,
       hashData["middleLuxembourgish"]= d.properties.middleLuxembourgish,
       hashData["middleMaltese"]= d.properties.middleMaltese,
       hashData["middlePolish"]= d.properties.middlePolish,
       hashData["middlePortugese"]= d.properties.middlePortugese,
       hashData["middleRomanian"]= d.properties.middleRomanian,
       hashData["middleSlovak"]= d.properties.middleSlovak,
       hashData["middleSlovenian"]= d.properties.middleSlovenian,
       hashData["middleSpanish"]= d.properties.middleSpanish,
       hashData["middleSwedish"]= d.properties.middleSwedish,
       hashData["middleRussian"]= d.properties.middleRussian,
       hashData["middleCatalan"]= d.properties.middleCatalan,
       hashData["youngestBulgarian"]= d.properties.youngestBulgarian,
       hashData["youngestCroatian"]= d.properties.youngestCroatian,
       hashData["youngestCzech"]= d.properties.youngestCzech,
       hashData["youngestDanish"]= d.properties.youngestDanish,
       hashData["youngestDutch"]= d.properties.youngestDutch,
       hashData["youngestEnglish"]= d.properties.youngestEnglish,
       hashData["youngestEstonian"]= d.properties.youngestEstonian,
       hashData["youngestFinnish"]= d.properties.youngestFinnish,
       hashData["youngestFrench"]= d.properties.youngestFrench,
       hashData["youngestGerman"]= d.properties.youngestGerman,
       hashData["youngestGreek"]= d.properties.youngestGreek,
       hashData["youngestHungarian"]= d.properties.youngestHungarian,
       hashData["youngestIrish"]= d.properties.youngestIrish,
       hashData["youngestItalian"]= d.properties.youngestItalian,
       hashData["youngestLatvian"]= d.properties.youngestLatvian,
       hashData["youngestLithuanian"]= d.properties.youngestLithuanian,
       hashData["youngestLuxembourgish"]= d.properties.youngestLuxembourgish,
       hashData["youngestMaltese"]= d.properties.youngestMaltese,
       hashData["youngestPolish"]= d.properties.youngestPolish,
       hashData["youngestPortugese"]= d.properties.youngestPortugese,
       hashData["youngestRomanian"]= d.properties.youngestRomanian,
       hashData["youngestSlovak"]= d.properties.youngestSlovak,
       hashData["youngestSlovenian"]= d.properties.youngestSlovenian,
       hashData["youngestSpanish"]= d.properties.youngestSpanish,
       hashData["youngestSwedish"]= d.properties.youngestSwedish,
       hashData["youngestRussian"]= d.properties.youngestRussian,
       hashData["youngestCatalan"]= d.properties.youngestCatalan;
       
       //eradicate the unimportant data
       var tooltipData = new Object();
       
       Object.keys(hashData).forEach(function (key) {
 
          if(hashData[key]>1){                  
              if(key.substring(0, 3)== "all" && all){//iff all button
                tooltipData[key]= hashData[key];
                toolString= key.substring(3, key.Length)+": "+tooltipData[key]+"<br>"+toolString;
              }else if(key.substring(0, 5)== "older" && older){//iff older button
                tooltipData[key]= hashData[key];
                toolString= key.substring(5, key.Length)+": "+tooltipData[key]+"<br>"+toolString;
              }else if(key.substring(0, 6)== "middle" && middle){//iff middle button
                tooltipData[key]= hashData[key];
                toolString= key.substring(6, key.Length)+": "+tooltipData[key]+"<br>"+toolString;
              }else if(key.substring(0, 8)== "youngest"&& youngest){//iff youngest button
                tooltipData[key]= hashData[key];
                toolString= key.substring(8, key.Length)+": "+tooltipData[key]+"<br>"+toolString;
              }
          }
        });
        firstStateData[currentCountry] = toolString;
        toolString = currentCountry+"<br>"+toolString;
        //console.log(toolString);
};
    
    document.getElementById("buttonAll").onclick = function(){all = true; older = false; middle = false; youngest = false;};
    document.getElementById("buttonOld").onclick = function(){all = false; older = true; middle = false; youngest = false;};
    document.getElementById("buttonMiddle").onclick = function(){all = false; older = false; middle = true; youngest = false;};
    document.getElementById("buttonYoungest").onclick = function(){all = false; older = false; middle = false; youngest = true;};
});

d3.select(self.frameElement).style("height", height + "px");
