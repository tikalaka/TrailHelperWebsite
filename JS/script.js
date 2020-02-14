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
    var distance = document.getElementById("distance").value;
    var minRating;
    var elements2 = document.getElementsByName("minimumRating");              
        for(i = 0; i < elements2.length; i++) { 
            if(elements2[i].checked) 
            minRating = "" + elements2[i].value; 
        }
    var length = document.getElementById("length").value;
    var difficulty;
    var elements3 = document.getElementsByName("difficulty");
        for(i = 0; i < elements3.length; i++){
            if(elements3[i].checked){
                difficulty = "" + difficultyDecider(elements3[i].value)
            }
        }
    document.getElementById("latitude").value = position.coords.latitude
    document.getElementById("longitude").value = position.coords.longitude
    getTrails(String(position.coords.latitude), String(position.coords.longitude), String(distance), String(minRating), String(length), String(difficulty))
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

function getTrails(latitude, longitude, distance, minStars, length, difficulty){
    let url = "https://www.hikingproject.com/data/get-trails?key=" + trailKey
        + "&maxDistance=" + distance + "&lat=" + latitude + "&lon=" + longitude + "&minStars=" + minStars // + "&maxResults=15"            

    fetch(proxyurl + url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        var x = document.getElementById("trailName1");
        var y = document.getElementById("trailLength1");
        var z = document.getElementById("trailStars1");
        x.innerHTML = data.trails[0].name
        y.innerHTML = data.trails[0].length;
        z.innerHTML = data.trails[0].stars;

        filterTrails(data.trails, length, difficulty)
    })
    .catch((error) => console.log(error))
}

function filterTrails(trails, length, difficulty){
    filteredTrails = []

    for(var i=0; i< trails.length; i++) {
        if(trails[i].length <= length) {
            if(trails[i].difficulty == difficulty){
                console.log(trails[i])
                filteredTrails.push(trails[i])
            }
        }
    }

    return filteredTrails
}

function difficultyDecider(difficulty) {
    if(difficulty == "easy") {
        return "green";
    } else if (difficulty == "easy/inter") {
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
            var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            document.getElementById("day1Icon").src = `../images/icons/` + data.data[0].weather.icon + ".png";
            document.getElementById("day2Icon").src = `../images/icons/` + data.data[1].weather.icon + ".png";
            document.getElementById("day3Icon").src = `../images/icons/` + data.data[2].weather.icon + ".png";
            document.getElementById("day4Icon").src = `../images/icons/` + data.data[3].weather.icon + ".png";
            document.getElementById("day5Icon").src = `../images/icons/` + data.data[4].weather.icon + ".png";
            document.getElementById("temp1").innerHTML = data.data[0].temp + "� F"
            document.getElementById("temp2").innerHTML = data.data[1].temp + "� F"
            document.getElementById("temp3").innerHTML = data.data[2].temp + "� F"
            document.getElementById("temp4").innerHTML = data.data[3].temp + "� F"
            document.getElementById("temp5").innerHTML = data.data[4].temp + "� F"
            document.getElementById("des1").innerHTML = data.data[0].weather.description;
            document.getElementById("des2").innerHTML = data.data[1].weather.description;
            document.getElementById("des3").innerHTML = data.data[2].weather.description;
            document.getElementById("des4").innerHTML = data.data[3].weather.description;
            document.getElementById("des5").innerHTML = data.data[4].weather.description;
            document.getElementById("date1").innerHTML = days[new Date(data.data[0].valid_date).getDay()];
            document.getElementById("date2").innerHTML = days[new Date(data.data[1].valid_date).getDay()];
            document.getElementById("date3").innerHTML = days[new Date(data.data[2].valid_date).getDay()];
            document.getElementById("date4").innerHTML = days[new Date(data.data[3].valid_date).getDay()];
            document.getElementById("date5").innerHTML = days[new Date(data.data[4].valid_date).getDay()];
        })
        .catch((error) => console.log(error))
    document.getElementById("day1").style.visibility = "visible";
    document.getElementById("day2").style.visibility = "visible";
    document.getElementById("day3").style.visibility = "visible";
    document.getElementById("day4").style.visibility = "visible";
    document.getElementById("day5").style.visibility = "visible";
}