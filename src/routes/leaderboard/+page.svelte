<script> 
    import Layout from "$lib/Layout.svelte";
    import { onMount } from "svelte";

    let leaderboard = [];
    let lastPlayer = null; // 🔥 Speichert den zuletzt gespielten Spieler (Name + Score)

    function loadLeaderboard() {
        const storedData = localStorage.getItem("leaderboard");
        leaderboard = storedData ? JSON.parse(storedData) : [];

        // 🔥 Den zuletzt gespielten Namen und die Punktzahl abrufen
        const storedLastPlayer = localStorage.getItem("lastPlayer");
        lastPlayer = storedLastPlayer ? JSON.parse(storedLastPlayer) : null;
    }

    onMount(loadLeaderboard);

    function restartGame() {
        window.location.href = "/game/quiz"; // Weiterleitung zum Quiz
    }
</script>

<Layout title="AviLex" />

<style>
    .leaderboard-container {
        max-width: 900px;
        margin: 30px auto;
        font-family: "DINNextLTPro", Arial, sans-serif;
        font-weight: normal;
        text-align: center;
    }

    .restart-button {
        display: block;
        margin: 20px auto;
        padding: 12px 20px;
        font-size: 1rem;
        border: none;
        background-color: #28a745;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .restart-button:hover {
        background-color: #218838;
    }

    .leaderboard {
        padding: 20px;
        background: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .leaderboard h2 {
        font-size: 2rem;
        margin-bottom: 15px;
    }

    .leaderboard table {
        width: 100%;
        border-collapse: collapse;
    }

    .leaderboard th, .leaderboard td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    .leaderboard th {
        font-weight: bold;
        background-color: #ddd;
    }

    .leaderboard tr:hover {
        background-color: #f1f1f1;
    }

    /* 🔥 Hervorhebung für den aktuellen Spieler */
    .highlight {
        background-color: #ffeb3b !important; /* Gelber Hintergrund */
        font-weight: bold;
    }
</style>

<div class="leaderboard-container">
    <!-- 🎮 Erneut spielen Button -->
    <button class="restart-button" on:click={restartGame}>🔄 Erneut spielen</button>

    <div class="leaderboard">
        <h2>🏆 Leaderboard</h2>

        {#if leaderboard.length === 0}
            <p>⚠️ Noch keine Einträge im Leaderboard.</p>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th>Platz</th>
                        <th>Name</th>
                        <th>Punkte</th>
                    </tr>
                </thead>
                <tbody>
                    {#each leaderboard as player, index}
                        <tr class="{lastPlayer && player.name === lastPlayer.name && player.score === lastPlayer.score ? 'highlight' : ''}">
                            <td>{index + 1}</td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>
