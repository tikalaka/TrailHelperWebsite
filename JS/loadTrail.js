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
        console.log(trailHead(data.trails[0]));
    })
    .catch((error) => console.log(error))
}

function trailHead(trailInfo) {
    document.getElementById("trailName").innerHTML = "trailHead";
}