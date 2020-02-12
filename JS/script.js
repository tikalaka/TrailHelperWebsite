var latitude = 0
var longitude = 0

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
    
function showPosition(position) {
    let distance = 10 //grab this from whever the distance is entered
    var rating = document.getElementById("minimumRating").value;
    console.log(rating); //filter by ratings
    document.getElementById("latitude").value = position.coords.latitude
    document.getElementById("longitude").value = position.coords.longitude
    getTrails(String(position.coords.latitude), String(position.coords.longitude), String(distance), String(rating))
    getWeather(String(position.coords.latitude), String(position.coords.longitude))
}
    
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const trailKey = "200681455-ed23a70461e56c7a6b59a26fbd4c00ba"

//RETURNS AN ARRAY OF TRAILS:

// id: 7017456
// name: "The Living Room"
// type: "Hike"
// summary: "A short, moderately steep hike up Red Butte with sandstone slab furniture and great views of the Salt Lake Valley."
// difficulty: "blue"
// stars: 4.3
// starVotes: 22
// location: "Salt Lake City, Utah"
// url: "https://www.hikingproject.com/trail/7017456/the-living-room"
// imgSqSmall: "https://cdn-files.apstatic.com/hike/7037954_sqsmall_1555087147.jpg"
// imgSmall: "https://cdn-files.apstatic.com/hike/7037954_small_1555087147.jpg"
// imgSmallMed: "https://cdn-files.apstatic.com/hike/7037954_smallMed_1555087147.jpg"
// imgMedium: "https://cdn-files.apstatic.com/hike/7037954_medium_1555087147.jpg"
// length: 2.4
// ascent: 960
// descent: -959
// high: 5977
// low: 5017
// longitude: -111.8214
// latitude: 40.7594
// conditionStatus: "Unknown"
// conditionDetails: null
// conditionDate: "1970-01-01 00:00:00"

function getTrails(latitude, longitude, distance, minStars){
    let url = "https://www.hikingproject.com/data/get-trails?key=" + trailKey
        + "&maxDistance=" + distance + "&lat=" + latitude + "&lon=" + longitude + "&minStars=" + minStars

    fetch(proxyurl + url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        filterTrails(data)
    })
    .catch((error) => console.log(error))
}

function filterTrails(trails, trailLength, trailDifficulty){
    //filter trails based on given parameters

    //this method will have the trails
}

//call this for every trail, and then add the distance from user to the object
function getTrailDistanceFromUser(trailLatitude, trailLongitude){
    if((trailLatitude == latitude) && (trailLongitude == longitude)){
        return 0
    }else{
        //get distance between trail and user location
        //based off google maps? or the math way
    }
}

//these two methods were returning a 403 error, but we might not even need them

// function getTrailByID(ID){
//     let url = "https://www.hikingproject.com/data/get-trails-by-id?key=" + trailKey
//         + "&ids" + ID

//     fetch(proxyurl + url, {
//         method: 'GET'
//     })
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => console.log(error))
// }

// function getTrailConditions(ID){
//     let url = "https://www.hikingproject.com/data/get-conditions?key=" + trailKey
//         + "&ids" + ID

//     fetch(proxyurl + url, {
//         method: 'GET'
//     })
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => console.log(error))
// }

function getWeather(latitude, longitude) {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=I&key=65ed0458f53149b6b28e74556c9ec0bf`;

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data.data[0].weather.description, data.data[0].temp)
            console.log(data.data[1].weather.description, data.data[1].temp)
            console.log(data.data[2].weather.description, data.data[2].temp)
            console.log(data.data[3].weather.description, data.data[3].temp)
            console.log(data.data[4].weather.description, data.data[4].temp)
        })
        .catch((error) => console.log(error))
}