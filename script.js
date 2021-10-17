document.getElementById("wordSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("wordInput").value;
    if (value === "")
      return;
    console.log(value);

  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + value;
  fetch(url)
  .then(function(response) 
    {return response.json(); 
    }).then(function(json) {
        console.log(json);
        //console.log(json[0].phonetics[0].text);
        let results = "";
        results += '<div id="chosenWord"><h1>' + json[0].word + "</h1>";
        results += "<h3>"
        results += "<p>" + json[0].phonetics[0].text + "</p>";
        //console.log(json.length);
        for (let i = 0; i < json.length; i++) {
            //results += "<p>Part of speech: " + json[0].meanings[i].partOfSpeech + "</p>";
            results += "<p>[" + (i+1) +"] " + json[0].meanings[i].partOfSpeech + ": " +json[0].meanings[i].definitions[0].definition + "</p>";
      }
        results += "</h3></div>";
        //results += "</div>";
        document.getElementById("wordResults").innerHTML = results;
    });

});