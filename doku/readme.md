## Must-Have
Integration einer API:
Die Unsplash-API wurde für die automatische Bildbeschaffung implementiert. Falls keine passenden Bilder gefunden werden, werden lokale Bilder verwendet.

Verwendung von Svelte-Komponenten:
→Die Anwendung nutzt  Svelte-Komponenten, darunter Layout.svelte , BirdCard.svelte
Mindestens zwei verschiedene Unterseiten / -bereiche, die mittels Routing integriert sind:
→ Es gibt mindestens zwei Bereiche: die Startseite, die Quiz-Seite und die Bibliothek, die über Routing aufgerufen werden können.

Verwendung üblicher Website-Bestandteile (Header, Navigationsleiste, etc.):
→ Die Anwendung verfügt über eine Navigationsleiste, ein Dropdown-Menü zur Sortierung und eine standardisierte Kartenstruktur für die Bibliothek.

Lauffähiges Programm:
→ Die Anwendung ist vollständig funktional und kann über einen Webserver ausgeführt werden.

## Should Have (~relevant für Note vor dem Komma)
Flowchart / Wireframes / o. Ä., die vor der technischen Umsetzung erstellt wurden:
→ Ordner
Responsive Design (1 Breakpoint → Mobile / Desktop):
→ Die Bibliothek und das Quiz passen sich  an verschiedene Bildschirmgrößen an.

Sinnvoller Einsatz von grid / flex:
→ Die Kartenanzeige (.bird-list) verwendet ein grid, um eine flexible und anpassbare Darstellung zu ermöglichen. Auch das Dropdown-Menü nutzt flex für eine gute UI-Experience.

## Could Have (~relevant für Note nach dem Komma)

Speichermöglichkeiten z. B. via localStorage:
→ Implementiert: Das Leaderboard speichert Punktzahlen und Spielernamen lokal mit localStorage, sodass der Fortschritt nach dem Spiel sichtbar bleibt.
## Herausforderung
Meine größte Herausforderung war das anfängliche aufsetzen der Projektstrukur, Außerdem haben bei Unsplash viele Bilder gefehlt weshalb ich einiges Lokal einbinden musste, auch weil Unsplash manchmal sehr schlechte Bilder geladen hat.