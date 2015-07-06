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
  var male = [];
  var female = [];
  var under20 = [];
  var over20 = [];
  data.map(function(d){
    console.log(d)
    var gender = d["Victim's Gender"];
    var age = d["Victim's Age"];
    if(gender == 'Male'){
      color = 'blue';
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
      radius: 3,
      color: color,
      opacity: 0.4
     });
      male.push(marker);
    } else{
      color = 'yellow';
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
      radius: 3,
      color: color,
      opacity: 0.4
     });
      female.push(marker);
    }
    if(age <= 20){
      color = 'red';
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
      radius: 3,
      color: color,
      opacity: 0.4
     });
      under20.push(marker);
    }else{
      color = 'green';
      var marker = new L.circleMarker([d["lat"], d["lng"]], {
      radius: 3,
      color: color,
      opacity: 0.4
     });
      over20.push(marker);
    }  

    marker.on('mouseover', function(evt){
      evt.target.bindPopup(d["Summary"]).openPopup();
    }); 
  });
  var gend={
    "Male": L.layerGroup(male),
    "Female": L.layerGroup(female)
  };
  var ag={
    "Under 20": L.layerGroup(under20),
    "Over 20": L.layerGroup(over20)
  };
  L.control.layers(gend, ag).addTo(map);
};


