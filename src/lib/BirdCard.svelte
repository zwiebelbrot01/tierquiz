<script>
    export let bird;
</script>

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
    }

    .bird-card {
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        padding: 15px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        min-height: 460px;
    }

    .bird-card img {
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: 5px;
    }

    .bird-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: rgb(0, 0, 0);
    margin-top: 3px; /* Falls du den Abstand nach oben noch verringern willst */
    padding-top: 0px;
}

.bird-details p {
    margin: 0px; /* Entfernt zusätzlichen Abstand */
    padding: 4px; /* Falls Padding ebenfalls Probleme verursacht */
    line-height: 1.2; /* Verringert den vertikalen Abstand */
}


    .stat {
        font-size: 1rem;
        color: #000;
        font-weight: normal;
    }

    .stat span {
        font-weight: bold;
    }

    audio {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>

<div class="bird-card">
    <img src="{bird.image}" alt="{bird.name}">
    <div class="bird-details">
        <h2>{bird.name}</h2>
        <p class="stat"><span>{bird.habitat}</span></p>
        <p class="stat"><span>{bird.Körperlänge ? `${bird.Körperlänge} cm` : "Unbekannt"}</span> Körperlänge</p>
        <p class="stat"><span>{bird.Spannweite ? `${bird.Spannweite} cm` : "Unbekannt"}</span> Spannweite</p>
        <audio controls>
            <source src="{bird.sound}" type="audio/mpeg">
            Dein Browser unterstützt kein Audio.
        </audio>
    </div>
</div>
