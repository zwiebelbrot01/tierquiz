<script>
    import Layout from "$lib/Layout.svelte";
    import { onMount, tick } from "svelte";
    import { getBirdSounds } from "$lib/fetchBirds.js";
    import { generateQuiz } from "$lib/quizLogic.js";

    let birds = [];
    let usedBirds = new Set();
    let currentQuestion = null;
    let score = 0;
    let totalQuestions = 0;
    let isLoading = true;
    let playerName = "";
    let gameStarted = false;
    let leaderboard = [];
    let selectedAnswer = null;
    let correctAnswer = null;
    let feedbackVisible = false;

    onMount(async () => {
        console.log("🔄 Quiz-Seite wird geladen...");

        try {
            birds = await getBirdSounds();
            console.log("🐦 Geladene Vögel:", birds);
        } catch (error) {
            console.error("❌ Fehler beim Laden der Vögel:", error);
        }

        if (!birds || birds.length === 0) {
            console.error("❌ Keine Vögel mit Sound verfügbar!");
            return;
        }

        totalQuestions = birds.length;
        loadLeaderboard();
    });

    function loadLeaderboard() {
        try {
            const storedData = localStorage.getItem("leaderboard");
            leaderboard = storedData ? JSON.parse(storedData) : [];
            console.log("📊 Geladene Bestenliste:", leaderboard);
        } catch (error) {
            console.error("❌ Fehler beim Laden der Bestenliste:", error);
        }
    }

    function startGame() {
        if (!playerName.trim()) {
            alert("❗ Bitte gib deinen Namen ein!");
            return;
        }

        gameStarted = true;
        loadNewQuestion();
    }

    async function loadNewQuestion() {
        if (usedBirds.size >= totalQuestions) {
            console.log("✅ Alle Fragen beantwortet.");
            saveScore(playerName, score);
            window.location.href = "/leaderboard"; 
            return;
        }

        isLoading = true;
        currentQuestion = null;
        selectedAnswer = null;
        correctAnswer = null;
        feedbackVisible = false;
        await tick();

        setTimeout(() => {
            let newQuestion = generateQuiz(birds, usedBirds);
            console.log("🎯 Generierte Frage:", newQuestion);

            if (!newQuestion || !newQuestion.correctAnswer) {
                console.error("🚨 Keine gültige Frage generiert!", newQuestion);
                saveScore(playerName, score);
                window.location.href = "/leaderboard";
                return;
            }

            currentQuestion = newQuestion;
            usedBirds.add(currentQuestion.correctAnswer);
            birds = birds.filter(bird => bird.name !== currentQuestion.correctAnswer);
            isLoading = false;
        }, 1000);
    }

    function checkAnswer(option) {
        if (!currentQuestion) return;
        
        selectedAnswer = option.name;
        correctAnswer = currentQuestion.correctAnswer;
        feedbackVisible = true;

        if (option.name === currentQuestion.correctAnswer) {
            score++;
            setTimeout(() => {
                feedbackVisible = false;
                loadNewQuestion();
            }, 2000);
        } else {
            setTimeout(() => {
                feedbackVisible = false;
                saveScore(playerName, score);
                window.location.href = "/leaderboard"; 
            }, 3000);
        }
    }

    function saveScore(name, score) {
        try {
            let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
            console.log("📊 Aktuelle Bestenliste:", leaderboard);

            leaderboard.push({ name, score });
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

            localStorage.setItem("lastPlayer", JSON.stringify({ name, score }));
            console.log("✅ Score gespeichert:", { name, score });

        } catch (error) {
            console.error("❌ Fehler beim Speichern der Punktzahl:", error);
        }
    }
</script>

<Layout title="AviLex" />

<style>
    @font-face {
        font-family: "DINNextLTPro";
        src: url("/fonts/DINNextLTPro-Regular.woff2") format("woff2"),
             url("/fonts/DINNextLTPro-Regular.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }

    * {
        font-family: "DINNextLTPro", Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .quiz-container {
        text-align: center;
        font-weight: normal;
    }

    .progress {
        font-size: 1.3rem;
        font-weight: bold;
        margin: 20px 0;
    }

    .error-message {
        color: red;
        font-size: 1.2rem;
        margin-top: 20px;
        font-weight: bold;
    }

    .name-input-container {
        text-align: center;
        margin-top: 50px;
    }

    input {
        padding: 12px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 80%;
        max-width: 300px;
        margin-top: 15px;
    }

    .start-button {
        padding: 12px 18px;
        font-size: 1rem;
        border: none;
        background-color: #28a745;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        margin-left: 10px;
        margin-top: 10px;
    }

    .start-button:hover {
        background-color: #218838;
    }

    .question-text {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .options {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 35px;
        margin-top: 50px;
    }

    .option-card {
        background-color: #eaeaea;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        width: 200px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-weight: normal;
        transition: background 0.3s ease-in-out;
    }

    .option-card:hover {
        background-color: #dcdcdc;
    }

    .option-card img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 5px;
    }

    .correct {
        background-color: #28a745 !important;
        color: white;
    }

    .incorrect {
        background-color: #dc3545 !important;
        color: white;
    }
</style>

<div class="quiz-container">
    {#if !gameStarted}
        <div class="name-input-container">
            <h2>Bitte gib deinen Namen ein, um zu starten:</h2>
            <input type="text" bind:value={playerName} placeholder="Dein Name..." />
            <button class="start-button" on:click={startGame}>Starten</button>
        </div>
    {:else if isLoading}
        <p>Lädt neue Frage...</p>
    {:else if currentQuestion}
        <p class="progress">Frage {Math.max(1, usedBirds.size)} </p>
        
        <p class="question-text">Welcher Vogel ist das?</p>
        
        <audio controls autoplay>
            <source src="{currentQuestion.question}" type="audio/mpeg">
            Dein Browser unterstützt kein Audio.
        </audio>

        <div class="options">
            {#each currentQuestion.options as option, index}
                <div class="option-card {feedbackVisible && option.name === correctAnswer ? 'correct' : ''} 
                        {feedbackVisible && selectedAnswer === option.name && option.name !== correctAnswer ? 'incorrect' : ''}"
                    on:click={() => checkAnswer(option)}
                >
                    <div>{String.fromCharCode(65 + index)}</div>
                    <div>{option.name}</div>
                    <img src="{option.image}" alt="{option.name}">
                </div>
            {/each}
        </div>
    {/if}
</div>
