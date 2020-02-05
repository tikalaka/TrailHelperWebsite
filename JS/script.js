let hikingRequest = new XMLHttpRequest();
let hikingApiKey = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200677137-6e8b5ee50a5384f5345b725c87e612d6"
let weatherRequest = new XMLHttpRequest();
let weatherApiKey = "http://api.openweathermap.org/data/2.5/forecast?lat=40.77&lon=-111.89&APPID=afa86f15fba51be4a824216fa51fa47c"


loadData();

function loadData() {
    // Get your own API key from OpenWeatherMap.org rather than using the demo one I use here in the 'appid'.
    // hikingRequest.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salt+Lake+City,us&units=imperial&cnt=5&appid=846d3b48355b6e95813bed8fb29f0fb3');


    hikingRequest.open('GET', hikingApiKey);
    hikingRequest.onload = loadComplete;
    hikingRequest.send();
	
	weatherRequest.open('GET', weatherApiKey);
    weatherRequest.onload = loadComplete;
    weatherRequest.send();


}

function loadComplete(evt) {
    hikingData = JSON.parse(hikingRequest.responseText);
    console.log(hikingData);

    weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);

}
