//Tested ob button gedrückt wurde
//Fetch-Anfrage, um Daten von der angegebenen URL abzurufen
fetch("https://jsonplaceholder.typicode.com/todos/1")
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
        // Konvertiert das gesamte Datenobjekt in einen JSON-String
        const jsonString = JSON.stringify(data, null, 2);
        // Füllt die Inhalte der HTML-Elemente mit den ausgewählten Daten
        document.getElementById("1").innerText = jsonString;
    })
    .catch((error) => console.error("FETCH ERROR:", error));