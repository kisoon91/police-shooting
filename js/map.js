var map;
var debug = false;
var message = function(text){
  if(debug)
    console.log('DEBUG:' + text)
};
// Function to draw your map
var drawMap = function() {
	map = L.map('container');
	map.setView([40, -95], 4);
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
	layer.on('ready', function(){
    message('Loaded');
    $('#map-loading').remove();
  });
  layer.addTo(map);
  getData(); 
};

// Function for getting data
var getData = function() {
  $.ajax({
    url:'data/response.json',
    type:'get',
    success:function(data){
      customBuild(data)
    },
    dataType:"json"
  });
};

// Do something creative with the data here!  
var customBuild = function(data, map) {
  var all = [];
  var none = [];
  var male = [];
  var female = [];
  var color;
  data.map(function(d){
    if(d["Victim's Gender"] == 'Male'){
      var marker = new L.circleMarker(d["lat"], d["lng"], {
      radius: 3,
      color: color,
      opacity: 0.4
     });
      color = 'blue';
      male.push(marker);
    } else{
      color = 'yellow';
      female.push(marker);
    }
    if(d["Victim's Age"] <= 20){
      color = 'red';
      under20.push(marker);
    }else{
      color = 'green';
      over20.push(marker);
    }  
    var marker = new L.circleMarker(d["lat"], d["lng"], {
      radius: 3,
      color: color,
      opacity: 0.4
     });
    marker.on('mouseover', function(evt){
      evt.target.bindPopup(data).openPopup();
      evt.target.bindPopup(d.Summary).openPopup();
    }); 
    dataType:"json"
  });
  var gender={
    "Male": L.layerGroup(male),
    "Female": L.layerGroup(female)
  };
  var age={
    "Under 20": L.layerGroup(under20),
    "Over 20": L.layerGroup(over20)
  };
  L.control.layers(gender, age).addTo(map);
};


