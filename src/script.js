function applyFontStylingToGeneratedContent(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
      element.style.fontFamily = "'Arial', sans-serif";
      element.style.lineHeight = "1.5";
      element.style.color = "#333";

      // Determine maximum width based on screen size
      let maxWidth = "100%";
      if (window.innerWidth <= 600) {
          element.style.fontSize = "14px";
          element.style.margin = "5px";
          element.style.padding = "8px";
          maxWidth = "90%";
      } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
          element.style.fontSize = "16px";
          element.style.padding = "10px 20px";
          maxWidth = "70%";
      } else {
          element.style.fontSize = "18px";
          element.style.margin = "15px";
          element.style.padding = "12px";
      }

      // Apply font-related styling to the dynamically generated content
      element.style.maxWidth = maxWidth;
  }
}

//Tested ob button gedrückt wurde
document.getElementById("button").addEventListener("click", function () {
  //Fetch-Anfrage, um Daten von der angegebenen URL abzurufen
  fetch("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRAUMHOCHZEITOGD&srsName=EPSG:4326&outputFormat=json")
    .then((response) => {
      // Überprüft, ob die Antwort erfolgreich ist
      if (response.ok) {
        // Konvertiert die Antwort in JSON-Format und gibt es zurück
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      // Generiert einen zufälligen Index basierend auf der Anzahl der Features im Datensatz
      randomIndex = Math.floor(Math.random() * data.features.length);

      // Füllt die Inhalte der HTML-Elemente mit den ausgewählten Daten
      document.getElementById("1").innerText = "Name: " + data.features[randomIndex].properties.LOCATION;
      document.getElementById("2").innerText = "Adresse: " + data.features[randomIndex].properties.ADRESSE;
      document.getElementById("3").innerText = "Weblink: " + data.features[randomIndex].properties.WEBLINK1;

      applyFontStylingToGeneratedContent("1");
      applyFontStylingToGeneratedContent("2");
      applyFontStylingToGeneratedContent("3");
    })
    .catch((error) => console.error("FETCH ERROR:", error));
});