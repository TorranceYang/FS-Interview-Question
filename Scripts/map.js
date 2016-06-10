var map;
var userLayer = null;
function displayMap()
{
  var baseURL = 'http://image.farmshots.com/imagery/tile/{x}/{y}/{z}?min_map=20&max_map=80&exprs=["b4", "b3", "b2"]&lossless=false&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1dWlkIjoiM2UxZmJhYTgtNzc0Mi00Njg1LTgzNGUtZTYxM2NiYjBlOGI4IiwiaWF0IjoxNDQ4MTQ1MzU2fQ.lmlXIRtIXeshZIb6ZuLrq7a6hnGgEgnbcELA21zIg5StzXj9dmg802Uls67hpT9FTPPpM1GJfpwczGDhZN2L0EXu9Tc-UiN0MYgMhV0wry_lSZgZdZZbWH68mWQAYL1FtajDaGDdk-CQHzRiAzXZIESvfazqLu92qqFL5URINr8'

  var asset_id = 'f9d8db24-4faa-4bf3-bf5c-96b06ff593c9';
  var asset_id_URL = baseURL + '&asset_id=' + asset_id;

  map = new ol.Map(
  {
      target: 'map',
      layers: 
      [
        new ol.layer.Tile(
        {
          source: new ol.source.XYZ(
          {
            url: asset_id_URL
          }),
          opacity: .99
        }),
        new ol.layer.Tile(
        {
          source: new ol.source.OSM({}),
          opacity: .3
        })  
      ],
      view: new ol.View(
      {
        center: [-90.20376205,34.95052523],
        maxZoom: 20,
        zoom: 12,
        projection: 'EPSG:4326'
        
      })
  });
  drawPolygon(map);
}

function clearScreen()
{
  if(userLayer !== null)
  {
    map.removeLayer(userLayer);
    userLayer = null;
  }
}

function recenterScreen()
{
  map.getView().setZoom(12);
  map.getView().setCenter([-90.20376205,34.95052523]);
}

var sources = 
[
  'http://maps.owm.io:8091/573130594ccf430100c37027/{z}/{x}/{y}?hash={e05671e9789340a847b115af17529fc0}',
  'http://maps.owm.io:8091/57336ef14ccf430100c3704d/{z}/{x}/{y}?hash={e05671e9789340a847b115af17529fc0}',
  'http://maps.owm.io:8091/57336f3c4ccf430100c3704e/{z}/{x}/{y}?hash={e05671e9789340a847b115af17529fc0}'
];

function loadUserLayer(layer)
{
  clearScreen();
  userLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({url: sources[layer]})
  });
  map.addLayer(userLayer);
}

function drawPolygon(map)
{
  var ring = [
              [
                -90.23826599121092,
                34.905642327699454
              ],
              [
                -90.24341583251953,
                34.95658840965474
              ],
              [
                -90.2581787109375,
                34.9805024453652
              ],
              [
                -90.23826599121092,
                34.99709749467282
              ],
              [
                -90.17990112304688,
                34.97965853942295
              ],
              [
                -90.14934539794922,
                34.96728025313222
              ],
              [
                -90.15174865722656,
                34.946458008003624
              ],
              [
                -90.21800994873047,
                34.90395296559004
              ],
              [
                -90.23826599121092,
                34.905642327699454
              ]
            ];

  var polygon = new ol.geom.Polygon([ring]);
  var feature = new ol.Feature(polygon);
  var vectorSource = new ol.source.Vector();
  vectorSource.addFeature(feature);
  var vectorLayer = new ol.layer.Vector(
  {
    source: vectorSource
  });
  map.addLayer(vectorLayer);
}