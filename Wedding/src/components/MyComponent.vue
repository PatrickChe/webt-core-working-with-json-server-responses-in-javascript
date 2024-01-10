<template>
  <!-- Hauptcontainer -->
  <div class="container mx-auto p-4">
    <!-- Button für Datenabruf -->
    <button @click="fetchData" class="bg-green-500 text-white py-3 px-6 mb-8 rounded-full text-xl">Daten Abrufen</button>
    
    <!-- Datenanzeigebereich in einer responsiven Rasteransicht -->
    <div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Kleinere Boxen mit Hintergrundfarbe und Abstand -->
      <div v-if="dataLoaded" v-for="box in boxes" :key="box.id" class="box p-2 bg-gray-100 rounded-md mb-4">
        <p class="font-semibold">{{ box.label }}:</p>
        <p>{{ box.value }}</p>
      </div>

      <!-- Nachricht bei noch nicht geladenen Daten -->
      <div v-if="!dataLoaded" class="text-gray-600">Drück auf den Button, um Daten zu laden.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // Datenfelder für die anzuzeigenden Informationen
    return {
      boxes: [
        { id: 1, label: "Name", value: "" },
        { id: 2, label: "Adresse", value: "" },
        { id: 3, label: "Weblink", value: "" }
      ],
      dataLoaded: false
    };
  },
  methods: {
    // Methode zum Abrufen von Daten über eine API-Anfrage
    fetchData() {
      // API-Anfrage an die angegebene URL
      fetch("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRAUMHOCHZEITOGD&srsName=EPSG:4326&outputFormat=json")
        .then((response) => {
          // Überprüft, ob die Antwort erfolgreich ist
          if (response.ok) {
            // Konvertiert die Antwort in JSON-Format und gibt es zurück
            return response.json();
          } else {
            // Fehlerbehandlung bei nicht erfolgreicher Antwort
            throw new Error("NETWORK RESPONSE ERROR");
          }
        })
        .then((data) => {
          // Zufällige Auswahl und Zuweisung von Daten an die Felder
          const randomIndex = Math.floor(Math.random() * data.features.length);
          this.boxes[0].value = data.features[randomIndex].properties.LOCATION;
          this.boxes[1].value = data.features[randomIndex].properties.ADRESSE;
          this.boxes[2].value = data.features[randomIndex].properties.WEBLINK1;
          this.dataLoaded = true;
        })
        .catch((error) => console.error("FETCH ERROR:", error));
    }
  }
};
</script>


<style scoped>
/* Stil für die Datenfelder */
.box {
  border: 1px solid #ddd;
  margin-bottom: 1rem; /* Abstand zwischen den Boxen durch Margin */
}

/* Hintergrundfarbe für den Datenanzeigebereich */
.grid {
  background-color: #f0f0f0;
  padding: 1rem;
}

/* Abstand unter dem Button */
button {
  margin-bottom: 1rem;
}
</style>