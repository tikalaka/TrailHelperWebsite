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

function filterTrails(trails, length, difficulty){
    //filter trails based on given parameters

    //this method will have the trails 
}

function getDistance(){
    //get distance between trail and user location

    //add the distance to the trail object
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
    let icon1 = document.getElementById("day1Icon");
    let icon2 = document.getElementById("day2Icon");
    let icon3 = document.getElementById("day3Icon");
    let icon4 = document.getElementById("day4Icon");
    let icon5 = document.getElementById("day5Icon");
    let temp1 = document.getElementById("temp1");
    let temp2 = document.getElementById("temp2");
    let temp3 = document.getElementById("temp3");
    let temp4 = document.getElementById("temp4");
    let temp5 = document.getElementById("temp5");
    let des1 = document.getElementById("des1");
    let des2 = document.getElementById("des2");
    let des3 = document.getElementById("des3");
    let des4 = document.getElementById("des4");
    let des5 = document.getElementById("des5");
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((data) => {
            icon1.src = `../images/icons/` + data.data[0].weather.icon + ".png";
            icon2.src = `../images/icons/` + data.data[1].weather.icon + ".png";
            icon3.src = `../images/icons/` + data.data[2].weather.icon + ".png";
            icon4.src = `../images/icons/` + data.data[3].weather.icon + ".png";
            icon5.src = `../images/icons/` + data.data[4].weather.icon + ".png";
            temp1.innerHTML = data.data[0].temp + "° F"
            temp2.innerHTML = data.data[1].temp + "° F"
            temp3.innerHTML = data.data[2].temp + "° F"
            temp4.innerHTML = data.data[3].temp + "° F"
            temp5.innerHTML = data.data[4].temp + "° F"
            des1.innerHTML = data.data[0].weather.description;
            des2.innerHTML = data.data[1].weather.description;
            des3.innerHTML = data.data[2].weather.description;
            des4.innerHTML = data.data[3].weather.description;
            des5.innerHTML = data.data[4].weather.description;
        })
        .catch((error) => console.log(error))
}