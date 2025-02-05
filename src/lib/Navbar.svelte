<script>
    export let title = "Vogelwelt";
</script>

<style>
    .navbar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
    }

    .page-title {
        font-size: 2.5rem;
        font-weight: bold;
        color: black;
        font-family: Arial, sans-serif;
        margin-bottom: 10px; /* Abstand zur Navigation */
    }

    .navbar {
        display: flex;
        gap: 20px;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .navbar a {
        text-decoration: none;
        color: black;
        transition: color 0.3s ease;
    }

    .navbar a:hover {
        color: #007bff;
    }
</style>

<div class="navbar-container">
    <h1 class="page-title">{title}</h1>
    <nav class="navbar">
        <a href="/">Home</a>
        <a href="/game/quiz">Quiz</a>
        <a href="/bibliothek">Bibliothek</a>
    </nav>
</div>
