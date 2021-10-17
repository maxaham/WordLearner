document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=5e8de217ef403ca04b67ebbff0fabe2b";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<div id="forecastNow"><h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      results += "<p>Feels Like: " + json.main.feels_like + "</p>";
      results += "<p>Wind | Speed: " + json.wind.speed + " mph - Direction: " + json.wind.deg + " degrees</p>";
      for (let i=0; i < json.weather.length; i++) {
	    results += json.weather[i].description
	    if (i !== json.weather.length - 1)
	    results += ", "
        }
        results += "</p></div>";
        document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=5e8de217ef403ca04b67ebbff0fabe2b";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log(json);
      let forecast = "";
      for (let i=0; i < json.list.length; i++) { //json.list.length
        forecast += "<div id='forecastOne'><h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += "<p>Feels Like: " + json.list[i].main.feels_like + "</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></div>'
    }
      document.getElementById("forecastResults").innerHTML = forecast;
    });

});