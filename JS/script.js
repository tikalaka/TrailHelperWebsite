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
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    
    document.getElementById("latitude").value = latitude
    document.getElementById("longitude").value = longitude
    
    getTrails()
    getWeather(String(latitude), String(longitude))
}

function getTrails(){
    var distance = document.getElementById("distance").value;
    var rating = document.getElementById("minimumRating").value;
    var length = document.getElementById("length").value;
    var difficulty = document.getElementById("difficulty").value;
    console.log(distance + " " + rating + " " + length + " " + difficulty)

    getTrails(String(position.coords.latitude), String(position.coords.longitude), String(distance), String(rating), String(length), String(difficulty))
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

function getTrails(latitude, longitude, distance, minStars, length, difficulty){
    let url = "https://www.hikingproject.com/data/get-trails?key=" + trailKey
        + "&maxDistance=" + distance + "&lat=" + latitude + "&lon=" + longitude + "&minStars=" + minStars
    
    fetch(proxyurl + url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data)

        filterTrails(data.trails, length, minStars, difficulty)
    })
    .catch((error) => console.log(error))
}

function filterTrails(trails, length, difficulty){
    var filteredTrails

    console.log("FILTER BY: trails: " + trails + " length: " + length + " difficulty: " + difficulty )

    for(var i=0; i< trails.length; i++) {
        if(trails[i].length <= length) {
            if(difficultyDecider(difficulty) == trails[i].difficulty){
                filterTrails.add(trails[i])
            }
        }
    } 
    console.log("filtered: " + filteredTrails);

    return filteredTrails
}

function difficultyDecider(difficulty) {
    console.log(difficulty)
    if(difficulty == "easy") {
        return "green";
    } else if (difficulty =="easy/inter") {
        return "greenBlue";
    } else if (difficulty == "inter") {
        return "blue";
    } else if (difficulty == "inter/diff") {
        return "blueBlack";
    } else if (difficulty == "diff") {
        return "black";
    } else {
        return "extreme";
    }
}

function getDistance(){ //the temporary 10 we have
    //get distance between trail and user location

    //add the distance to the trail object
}

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