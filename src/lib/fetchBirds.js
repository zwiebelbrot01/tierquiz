import birdData from "$lib/birdData.json";

// Zugriff auf die Umgebungsvariable
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

console.log("Unsplash API Key:", UNSPLASH_ACCESS_KEY); // Prüfe, ob er geladen wird

// Falls der Key nicht geladen wird, eine Warnung ausgeben
if (!UNSPLASH_ACCESS_KEY) {
    console.error("❌ Unsplash API Key ist nicht definiert! Stelle sicher, dass .env korrekt geladen wird.");
}

// Funktion zum Abrufen von Vogelbildern
export async function getBirdImage(birdName) {
    // Lokale Bilder zuerst verwenden
    const LOCAL_IMAGES = {
        "Javablattvogel": "/images/javablattvogel.jpg",
        "Schuhschnabel": "/images/schuhschnabel.png"
    };

    if (LOCAL_IMAGES[birdName]) {
        console.log(`📸 Lokales Bild für ${birdName} wird verwendet.`);
        return LOCAL_IMAGES[birdName];
    }

    // Falls Unsplash-Key nicht verfügbar ist, ein lokales Bild verwenden
    if (!UNSPLASH_ACCESS_KEY) {
        console.warn(`⚠️ Kein API Key gefunden, verwende lokales Bild für ${birdName}.`);
        return findLocalBirdImage(birdName);
    }

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                birdName
            )}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results[0].urls.small;
        } else {
            console.warn(`⚠️ Kein Unsplash-Bild für ${birdName} gefunden. Verwende lokales Bild.`);
            return findLocalBirdImage(birdName);
        }
    } catch (error) {
        console.error(`❌ Fehler beim Abrufen des Unsplash-Bildes für ${birdName}:`, error);
        return findLocalBirdImage(birdName);
    }
}

// Funktion zum Finden eines lokalen Bildes
function findLocalBirdImage(birdName) {
    const bird = birdData.find(b => b.name === birdName);
    return bird?.image || "/images/default-bird.jpg";
}

// Funktion zum Laden der Vogel-Daten
export async function getBirdSounds() {
    try {
        console.log("🔄 Lade Vogelgeräusche aus der lokalen Datei...");

        let birds = birdData.filter(bird => bird.sound);

        console.log("📢 Vögel geladen:", birds);

        birds = await Promise.all(
            birds.map(async (bird) => ({
                ...bird,
                image: await getBirdImage(bird.name),
            }))
        );

        console.log("📸 Alle Bilder geladen:", birds);
        return birds;
    } catch (error) {
        console.error("❌ Fehler beim Laden der Vogel-Daten:", error);
        return [];
    }
}
