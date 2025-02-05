export function generateQuiz(birds, usedBirds) {
    console.log("📢 Generiere Quiz mit verbleibenden Vögeln:", birds);
    if (!birds || birds.length === 0) {
        console.error("❌ Keine Vögel mehr verfügbar.");
        return null;
    }

    let availableBirds = birds.filter(bird => !usedBirds.has(bird.name));

    if (availableBirds.length === 0) {
        console.warn("🚨 Keine neuen Vögel verfügbar.");
        return null;
    }

    const questionBird = availableBirds[Math.floor(Math.random() * availableBirds.length)];

    let options = new Set();
    options.add(questionBird);

    while (options.size < 4 && availableBirds.length > 1) {
        const randomBird = availableBirds[Math.floor(Math.random() * availableBirds.length)];
        if (![...options].some(option => option.name === randomBird.name)) {
            options.add(randomBird);
        }
    }

    // Konvertiere das Set in ein Array und mische es
    let optionsArray = Array.from(options);

    // Zufällige Position für die korrekte Antwort
    const correctIndex = Math.floor(Math.random() * optionsArray.length);
    const correctAnswer = questionBird;

    // Stelle sicher, dass die richtige Antwort an der zufälligen Position ist
    optionsArray = optionsArray.filter(option => option.name !== correctAnswer.name); // Entferne die korrekte Antwort
    optionsArray.splice(correctIndex, 0, correctAnswer); // Füge die korrekte Antwort an der zufälligen Position ein

    console.log("✅ Neue Frage erstellt:", {
        question: questionBird.sound,
        correctAnswer: questionBird.name,
        options: optionsArray,
        image: questionBird.image,
    });

    return {
        question: questionBird.sound,
        correctAnswer: questionBird.name,
        options: optionsArray,
        image: questionBird.image,
    };
}
