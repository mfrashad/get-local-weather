var lat = 0;
var lon = 0;
var url = "";
var unitTemp = "C";
var coord;

getLocation();

function getLocation() {
  if(navigator.geolocation){
    console.log("geoLocation supported");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser");
  }
}

function showPosition(position){
  console.log(position.coords.latitude +" " +position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat);
  url = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
  request();
}

function showError(err){
  alert("Geolocation Error");
}

function request(){
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      coord = JSON.parse(this.responseText);
      updateDisplay(coord);
      
    }
  };
  xhttp.open("GET",url,true);
  xhttp.send();
}

function updateDisplay(coord) {
  document.getElementById("temp").innerHTML = coord.main["temp"]+" "+unitTemp+ String.fromCharCode(176);
      
      document.getElementById("desc").innerHTML = coord.weather[0].description.split(" ").map(function(val){
        return val.slice(0,1).toUpperCase()+val.slice(1);
      }).join(" ") ;
      document.getElementById("icon").src = coord.weather[0].icon;
      
      
}

document.getElementById("ftemp").onclick = ftemp;
document.getElementById("ctemp").onclick = ctemp;

function ftemp() {
  if(unitTemp!="F"){
    coord.main.temp = Math.round(coord.main.temp * (9/5)+32);
    unitTemp = "F";
    updateDisplay(coord);
    document.getElementById("ftemp").classList.add("active");
    document.getElementById("ctemp").classList.remove("active");
  }
}
  
  function ctemp() {
  if(unitTemp!="C"){
    coord.main.temp = Math.round((coord.main.temp - 32)* (5/9));
    unitTemp = "C";
    updateDisplay(coord);
    document.getElementById("ctemp").classList.add("active");
    document.getElementById("ftemp").classList.remove("active");
  }
  
}