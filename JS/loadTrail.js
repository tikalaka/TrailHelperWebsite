//var id = sessionStorage.Id;
//sessionStorage.Id = trails.id;

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const trailKey = "200681455-ed23a70461e56c7a6b59a26fbd4c00ba"

function getTrail() {
    sessionStorage.Id = getId("id", 1);

    let url = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + sessionStorage.Id + "&key=" + trailKey;
    console.log(url)

    fetch(proxyurl + url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.trails[0]);
        document.getElementById("trailName").innerHTML = data.trails[0].name;
        document.getElementById("type").innerHTML = "Type: " + data.trails[0].type;
        document.getElementById("summary").innerHTML = data.trails[0].summary;
        document.getElementById("difficulty").innerHTML = data.trails[0].difficulty;
        document.getElementById("stars").innerHTML = data.trails[0].stars;
        document.getElementById("location").innerHTML = data.trails[0].location;
        document.getElementById("image").src = data.trails[0].imgSmall;
        document.getElementById("length").innerHTML = data.trails[0].length + " miles";
        document.getElementById("ascent/elevation").innerHTML = data.trails[0].ascent + " feet";
        document.getElementById("conditionStatus").innerHTML = data.trails[0].conditionStatus;
        document.getElementById("conditionDetails").innerHTML = data.trails[0].conditionDetails;
        document.getElementById("conditionDate").innerHTML = data.trails[0].conditionDate;
        getWeather(data.trails[0].latitude, data.trails[0].longitude);
    })
    .catch((error) => console.log(error))
}

function getId(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

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
            document.getElementById("temp1").innerHTML = data.data[0].temp + "&#176 F"
            document.getElementById("temp2").innerHTML = data.data[1].temp + "&#176 F"
            document.getElementById("temp3").innerHTML = data.data[2].temp + "&#176 F"
            document.getElementById("temp4").innerHTML = data.data[3].temp + "&#176 F"
            document.getElementById("temp5").innerHTML = data.data[4].temp + "&#176 F"
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