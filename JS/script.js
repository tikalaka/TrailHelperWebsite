$(document).ready(function(){
    var x = document.getElementById("demo");

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    
    function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
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



    let key = "b6be47e08eafafc2aa026f941d71b5ea836c6defdb410df07668da19dbc1ee37"
    
    //"description" : returns a description of the trail (may be empty)
    //"name" : name of trailhead
    //"id" : trailhead id
    //"park_agency_name" : name of the park agency (NOT the park)
    //"park_agency_website" : website to the park agency (contact info)
    //"park_name" : the name of the park
    //"trip_ids" : an array of trip ids associated with the trailhead
    function getTrailheads(latitude, longitude, distance){
        let url = "https://api.transitandtrails.org/api/v1/trailheads.xml?key=" + key
        + "&distance=" + distance + "&latitude=" + latitude + "&longitude=" + longitude

    }

    //this returns the url to the map
        //"url" returns the url
    function getTrailheadMaps(trailheadID){
        let url = "https://api.transitandtrails.org/api/v1/trailheads/" + trailheadID + "/maps.xml?key=" + key
    }

    //not all trails return images
        //"square" returns a square image
        //"medium" returns a medium image
    function getTrailheadImages(trailheadID){
        let url = "https://api.transitandtrails.org/api/v1/trailheads/" + trailheadID + "/photos.xml?key=" + key
    }

    //tripID will come from the trails object
        //"trip_ids" from the trailhead object returns an array of all 
            //trip ids ( 0 - many) -- the tripID parameter is that
        
        //"id" : trip id
        //"alerts" : i would assume warnings / dangers / alerts?
        //"description" : the description of the trip
        //"duration" : length of trip
        //"ending_trailhead_id" : the trailhead id at the end of the trip
        //"intensity" : dififculty
        //"length_miles" : the length, in miles
        //"name" : name of trip
        //"starting_trailhead_id" : the id of the starting trailhead
    function getTrip(tripID){
        let url = "https://api.transitandtrails.org/api/v1/trips/" + tripID + ".xml?key=" + key
    }

    //this returns a bunch of coordinates, honestly idk if it's useful or not?
        //"route" : array of coordinates
    function getTripRoute(tripID){
        let url = "https://api.transitandtrails.org/api/v1/trips/" + tripID + "/route.xml?key=" + key
    }
})