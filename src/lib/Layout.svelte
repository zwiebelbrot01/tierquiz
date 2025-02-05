<script>
    import { page } from '$app/stores';
    export let title = "Vogelwelt";
</script>

<style>
    @font-face {
        font-family: 'DINNextLTPro';
        src: url('/fonts/din-next-lt-pro/DINNextLTPro-Bold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'DINNextLTPro';
        src: url('/fonts/din-next-lt-pro/DINNextLTPro-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'DINNextLTPro', Arial, sans-serif;
        font-weight: normal;
        margin: 0;
        padding: 0;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 30px;
    }

    .title {
        font-size: 2.8rem;
        font-weight: bold;
        font-family: 'DINNextLTPro', Arial, sans-serif;
        color: black;
        margin-bottom: 10px;
    }

    .nav-links {
        display: flex;
        gap: 20px;
        font-family: 'DINNextLTPro', Arial, sans-serif;
        font-weight: normal;
    }

    .nav-links a {
        text-decoration: none;
        font-size: 1.4rem;
        color: black;
        font-weight: normal;
    }

    .nav-links a.active {
        font-weight: bold;
    }

    .nav-links a:hover {
        text-decoration: underline;
    }
</style>

<div class="header">
    <div class="title">{title}</div>
    <nav class="nav-links">
        <a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>Home</a>
        <a href="/game/quiz" class={$page.url.pathname.startsWith('/game/quiz') ? 'active' : ''}>Quiz</a>
        <a href="/bibliothek" class={$page.url.pathname.startsWith('/bibliothek') ? 'active' : ''}>Bibliothek</a>
    </nav>
</div>

<slot />
 