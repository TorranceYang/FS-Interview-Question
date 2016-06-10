$(document).ready(function()
{
	$.ajax(
	{
		type: 'Get',
		url: 'http://api.farmshots.com/imagery/catalogs?bounds={"type":"Polygon","coordinates":[[[-90.23826599121092,34.905642327699454],[-90.24341583251953,34.95658840965474],[-90.2581787109375,34.9805024453652],[-90.23826599121092,34.99709749467282],[-90.23826599121092,34.905642327699454]]]}&cloud_cover=10&source=landsat8&page=0',
		dataType: 'json',
		success: function(data)
		{
			var result = [];
			$.each(data, function(key, values)
			{
				result.push(values.asset_id);
			});
			handleMap(result);
		}
	});
});

function handleMap(result)
{
	var baseURL = 'http://image.farmshots.com/imagery/tile/{x}/{y}/{z}?min_map=20&max_map=80&exprs=["b4", "b3", "b2"]&lossless=false&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1dWlkIjoiM2UxZmJhYTgtNzc0Mi00Njg1LTgzNGUtZTYxM2NiYjBlOGI4IiwiaWF0IjoxNDQ4MTQ1MzU2fQ.lmlXIRtIXeshZIb6ZuLrq7a6hnGgEgnbcELA21zIg5StzXj9dmg802Uls67hpT9FTPPpM1GJfpwczGDhZN2L0EXu9Tc-UiN0MYgMhV0wry_lSZgZdZZbWH68mWQAYL1FtajDaGDdk-CQHzRiAzXZIESvfazqLu92qqFL5URINr8'

	var asset_id = result[0];
	var asset_id_URL = baseURL + '&asset_id=' + asset_id;

	var map = new ol.Map(
	{
		target: 'map',
		layers: 
		[

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
		    zoom: 11,
		    projection: 'EPSG:4326' 
		})
	});

	var myTile = new ol.layer.Tile(
	{
		source: new ol.source.XYZ(
		{
			url: asset_id_URL
		}),
	    opacity: .99
	});
	
	map.addLayer(myTile);
	drawPolygon(map);

	var myVar = setInterval(displayMap, 5000);
	var i = 1;
	function displayMap()
	{
		if(i == 5 || result.length < i) //Incase we somehow dont have 5 images in result
		{
			i = 0;
		}
		console.log(i);
		map.removeLayer(myTile);

		asset_id = result[i];
		asset_id_URL = baseURL + '&asset_id=' + asset_id;

		myTile = new ol.layer.Tile(
		{
		    source: new ol.source.XYZ(
		    {
		    	url: asset_id_URL
		    }),
		    opacity: .99
		});

		map.addLayer(myTile);
		drawPolygon(map);
		i++;
	}
}
