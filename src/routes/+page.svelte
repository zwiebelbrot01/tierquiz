<script>
    import Layout from "$lib/Layout.svelte";
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    let title = "AviLex";

    let birdFacts = [
        "Der Javablattvogel kann meisterhaft Stimmen anderer Vögel imitieren und tarnt sich perfekt im Laub des Regenwaldes.",
        "Der Rotkopf-Specht kann mit seinem Schnabel bis zu 20 Schläge pro Sekunde gegen einen Baumstamm hämmern.",
        "Der Sumpfrohrsänger ist ein begnadeter Sänger, der über 200 verschiedene Vogelstimmen in sein Repertoire aufnimmt.",
        "Die Mönchsgrasmücke ist einer der wenigen Zugvögel, die ihre Route durch individuelles Lernen anpassen können.",
        "Die Nachtigall kann bis zu 260 verschiedene Gesangsmotive singen und ist für ihren melodiösen Nachtgesang bekannt.",
        "Der Pirol hat ein leuchtend gelbes Gefieder, das ihn vor Feinden tarnt, es sieht aus wie das Licht durch Blätter.",
        "Das Schwarzkehlchen hält sich bevorzugt auf hohen Sitzwarten auf, von wo aus es seine Umgebung überblickt.",
        "Der Zaunkönig baut kugelförmige Nester aus Moos und Blättern, oft mehrere als Lockangebot für Weibchen.",
        "Die Blaumeise kann kopfüber an Ästen hängen, um an schwer erreichbare Nahrung zu kommen.",
        "Die Kohlmeise kann bis zu 40 verschiedene Laute von sich geben und ist sehr lernfähig.",
        "Das Rotkehlchen verteidigt sein Revier nicht nur mit Gesang, sondern kann auch sehr aggressiv werden.",
        "Der Eisvogel taucht blitzschnell ins Wasser, um Fische mit seinem dolchartigen Schnabel zu fangen.",
        "Der Buchfink singt mit regionalen Dialekten, je nach Herkunft klingen seine Melodien unterschiedlich.",
        "Der Turmfalke kann im Rüttelflug in der Luft stehen bleiben, um nach Beute zu spähen.",
        "Der Waldkauz ist ein hervorragender Jäger, der seine Beute fast lautlos in der Dunkelheit überrascht.",
        "Die Schleiereule kann aufgrund ihrer herzförmigen Gesichtsscheibe Geräusche extrem präzise orten.",
        "Der Uhu ist die größte Eulenart Europas und kann Beutetiere bis zur Größe eines Hasen erlegen.",
        "Der Kernbeißer hat einen so starken Schnabel, dass er mühelos Kirschkerne knacken kann.",
        "Der Girlitz ist ein kleiner Singvogel, dessen trillernder Gesang oft mit dem Summen von Insekten verwechselt wird.",
        "Der Flussregenpfeifer tarnt seine Eier perfekt, sodass sie auf kiesigen Böden kaum zu erkennen sind.",
        "Der Neuntöter spießt Insekten und kleine Beutetiere auf Dornen auf, um Vorräte für schlechte Zeiten zu haben.",
        "Der Schwarzspecht kann mit seinem kräftigen Schnabel große Löcher in Baumstämme schlagen, eine Wohnhöhle für viele Tiere.",
        "Der Waldlaubsänger hat eine besonders sanfte Stimme, die oft als melodisches Flüstern des Waldes beschrieben wird.",
        "Der Steinkauz ist tagsüber aktiv und kann mit seinen großen Augen selbst schwaches Licht optimal nutzen.",
        "Die Feldlerche kann während ihres Gesangs minutenlang in der Luft stehen bleiben, um ihr Revier zu markieren.",
        "Der Gimpel ernährt sich gerne von Knospen und kann mit seinem Schnabel sogar harte Samen knacken.",
        "Der Hyazinthara ist der größte fliegende Papagei der Welt und kann mit seinem kräftigen Schnabel Kokosnüsse knacken.",
        "Der Königsparadiesvogel hat eines der farbenprächtigsten Gefieder und beeindruckt Weibchen mit tänzerischen Balzritualen.",
        "Der Quetzal galt bei den Maya als heilig und wurde als Symbol für Freiheit und Schönheit verehrt.",
        "Der Schuhschnabel hat einen massiven Schnabel mit Haken, mit dem er selbst große Fische oder kleine Krokodile packen kann.",
        "Die Harpyie ist eine der stärksten Greifvögel der Welt und kann Affen und Faultiere aus Bäumen reißen.",
        "Der Weißkopfseeadler kann mit seinen scharfen Augen Beute aus über 3 km Entfernung erspähen."
    ];

    let currentFact = "";
    let isFading = false;

    function getRandomFact() {
        return birdFacts[Math.floor(Math.random() * birdFacts.length)];
    }

    function changeFact() {
        isFading = true;
        setTimeout(() => {
            currentFact = getRandomFact();
            isFading = false;
        }, 1000);
    }

    onMount(() => {
        currentFact = getRandomFact(); // Beim Laden der Seite direkt einen zufälligen Fakt setzen
        setInterval(changeFact, 5000); // Wechselt alle 5 Sekunden
        initBirdAnimation();
    });

    let scene, camera, renderer, birds = [];

    function initBirdAnimation() {
        const container = document.getElementById("bird-animation");

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 700, 3000);

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.z = 800;

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        class BirdGeometry extends THREE.BufferGeometry {
            constructor() {
                super();

                const wingsSpan = 10;
                const vertices = new Float32Array([
                    0, 0, -10, 0, -4, 5, 0, 0, 15, // Körper
                    0, 0, -8, -wingsSpan, 0, 2, 0, 0, 8, // Flügel links
                    0, 0, 8, wingsSpan, 0, 2, 0, 0, -8 // Flügel rechts
                ]);

                this.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
                this.scale(0.3, 0.3, 0.3);
            }
        }

        for (let i = 0; i < 50; i++) {
            let birdMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            let birdMesh = new THREE.Mesh(new BirdGeometry(), birdMaterial);

            birdMesh.position.set(
                (Math.random() - 0.5) * 1600,
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800
            );

            birdMesh.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            );

            scene.add(birdMesh);
            birds.push(birdMesh);
        }

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);

        birds.forEach((bird) => {
            bird.position.add(bird.velocity);

            if (bird.position.x > 800 || bird.position.x < -800) bird.velocity.x *= -1;
            if (bird.position.y > 400 || bird.position.y < -400) bird.velocity.y *= -1;
            if (bird.position.z > 400 || bird.position.z < -400) bird.velocity.z *= -1;

            bird.rotation.y += 0.005;
        });

        renderer.render(scene, camera);
    }
</script>

<Layout title={title} />

<style>
    * {
        font-family: "DINNextLTPro", Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #bird-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
    }

    .fact-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 800px;
        font-size: 2rem;
        font-weight: bold;
        color: #222;
        transition: opacity 1s ease-in-out;
        padding: 20px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        text-align: center;
    }

    .fade-out {
        opacity: 0;
    }

    .fade-in {
        opacity: 1;
    }
</style>

<!-- Hintergrundanimation -->
<div id="bird-animation"></div>

<!-- Faktenanzeige -->
<div class="fact-container {isFading ? 'fade-out' : 'fade-in'}">
    {currentFact}
</div>
