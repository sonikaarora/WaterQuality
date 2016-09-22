// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'map', {
  center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2
});

L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
  attribution: 'TEAM: CMPE 281 ',
  subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + '../images/pin24.png',
  iconRetinaUrl: myURL + '../images/pin48.png',
  iconSize: [35, 35],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < sensor.length; ++i )
{
	

	
	var popup = '<br/><b>Sensor Name: </b>' +sensor[i].sensorname +
	'<br/><b>Sensor Specs: </b>' +sensor[i].sensorspecs +
	'<br/><b>Sensor Type: </b>' +sensor[i].sensortype +
    '<br/><b>Location: </b>' + sensor[i].location +
    '<br/><b>Sensor Status: </b>' +sensor[i].status;
	

  var m = L.marker( [sensor[i].lat, sensor[i].lng], {icon: myIcon} )
  .bindPopup( popup );
  
  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
