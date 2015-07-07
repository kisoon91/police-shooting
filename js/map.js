var map;
// Function to draw your map
var drawMap = function() {
	map = L.map('container');
	map.setView([40, -95], 4);
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  layer.addTo(map);
  getData(map); 
};

// Function for getting data
var getData = function() {
  $.ajax({
    url:'data/response.json',
    type:'get',
    success:function(data){
      customBuild(data, map)
    },
    dataType:"json"
  });
};

// Do something creative with the data here!  
var customBuild = function(data, map) {
  var color;  
  var none = [];
  var all = [];
  var male = [];
  var female = [];
  var under20 = [];
  var over20 = [];
  data.map(function(d){
    if (gender == 'Male'|| !(gender == 'Male')){
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
        radius: 3,
        color: 'black',
        opacity: 0.4
      });
      marker.on('mouseover', function(evt){
        evt.target.bindPopup("Summary: " + d["Summary"]).openPopup();
      }); 
      all.push(marker);
    };
    var gender = d["Victim's Gender"];
    var age = d["Victim's Age"];
    if(gender == 'Male'){
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
        radius: 3,
        color: 'blue',
        opacity: 0.4
      });
      marker.on('mouseover', function(evt){
        evt.target.bindPopup("Summary: " + d["Summary"]).openPopup();
      }); 
      male.push(marker);
    } else{
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
        radius: 3,
        color: 'yellow',
        opacity: 0.4
      });
      marker.on('mouseover', function(evt){
        evt.target.bindPopup("Summary: " + d["Summary"]).openPopup();
      }); 
      female.push(marker);
    }
    if(age <= 20){
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
        radius: 3,
        color: 'red',
        opacity: 0.4
      });
      marker.on('mouseover', function(evt){
        evt.target.bindPopup("Summary: " + d["Summary"]).openPopup();
      });  
      under20.push(marker);
    }else{
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
        radius: 3,
        color: 'green',
        opacity: 0.4
      });
      marker.on('mouseover', function(evt){
        evt.target.bindPopup("Summary: " + d["Summary"]).openPopup();
      }); 
      over20.push(marker);
    }  
  });
  var everything = {
    "All": L.layerGroup(all),
    "None": L.layerGroup(none)
  }
  var gendage={
    "Male": L.layerGroup(male),
    "Female": L.layerGroup(female),
    "Under 20": L.layerGroup(under20),
    "Over 20": L.layerGroup(over20)
  };
  L.control.layers(everything, gendage).addTo(map);
};


