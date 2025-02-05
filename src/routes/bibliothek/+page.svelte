<script>
    import Layout from "$lib/Layout.svelte";
    import { onMount } from "svelte";
    import birdData from "$lib/birdData.json";
    import { getBirdImage } from "$lib/fetchBirds.js";
    import BirdCard from "$lib/BirdCard.svelte";

    let birds = [];
    let sortedBirds = [];
    let selectedSort = "name";
    let showDropdown = false;
    let selectedLabel = "Name A-Z";

    const sortOptions = [
        { value: "name", label: "Name A-Z" },
        { value: "Körperlänge_absteigend", label: "Körperlänge (absteigend)" },
        { value: "Spannweite_absteigend", label: "Spannweite (absteigend)" }
    ];

    onMount(async () => {
        birds = await Promise.all(
            birdData.map(async (bird) => ({
                ...bird,
                image: await getBirdImage(bird.name),
            }))
        );
        sortedBirds = [...birds];
        sortBirds();
    });

    function sortBirds() {
        sortedBirds = [...birds];

        if (selectedSort === "name") {
            sortedBirds.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedSort === "Körperlänge_absteigend") {
            sortedBirds.sort((a, b) => (parseInt(b.Körperlänge) || 0) - (parseInt(a.Körperlänge) || 0));
        } else if (selectedSort === "Spannweite_absteigend") {
            sortedBirds.sort((a, b) => (parseInt(b.Spannweite) || 0) - (parseInt(a.Spannweite) || 0));
        }
    }

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function selectSort(option) {
        selectedSort = option;
        selectedLabel = sortOptions.find(o => o.value === option)?.label || "Sortieren nach";
        sortBirds();
        showDropdown = false;
    }
</script>

<Layout title="AviLex" />

<style>
    .library-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px auto;
        max-width: 1000px;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        margin-bottom: 25px;
    }

    .dropdown-button {
        background-color: white;
        border: 0px solid #ccc;
        padding: 10px 15px;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 5px;
    }

    .chevron {
        margin-left: 8px;
        transition: transform 0.3s ease;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: white;
        border: 0px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        width: 100%;
        z-index: 10;
        display: none;
    }

    .dropdown.open .dropdown-menu {
        display: block;
    }

    .dropdown-menu div {
        padding: 10px;
        cursor: pointer;
        text-align: left;
    }

    .dropdown-menu div:hover {
        background-color: #f1f1f1;
    }

    .bird-list {
        margin-top: 15px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        width: 100%;
        justify-items: center;
    }
</style>

<div class="library-container">
    <div class="dropdown {showDropdown ? 'open' : ''}">
        <button class="dropdown-button" on:click={toggleDropdown}>
            {selectedLabel}
            <span class="chevron">{showDropdown ? "▲" : "▼"}</span>
        </button>
        <div class="dropdown-menu">
            {#each sortOptions as option}
                <div on:click={() => selectSort(option.value)}>{option.label}</div>
            {/each}
        </div>
    </div>

    {#if sortedBirds.length === 0}
        <p>🚀 Lade die Vogel-Bibliothek...</p>
    {:else}
        <div class="bird-list">
            {#each sortedBirds as bird (bird.name)}
                <BirdCard {bird} />
            {/each}
        </div>
    {/if}
</div>
