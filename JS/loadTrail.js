//var id = sessionStorage.Id;
//sessionStorage.Id = trails.id;

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const trailKey = "200681455-ed23a70461e56c7a6b59a26fbd4c00ba"

function getTrail() {
    sessionStorage.Id = "7006813";

    let url = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + sessionStorage.Id + "&key=" + trailKey;
    console.log(url)

    fetch(proxyurl + url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.trails[0]);
        document.getElementById("trailName").innerHTML = data.trails[0].name;
        document.getElementById("type").innerHTML = data.trails[0].type;
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
    })
    .catch((error) => console.log(error))
}

function trailHead(trailInfo) {
    document.getElementById("trailName").innerHTML = trailInfo.name;
}