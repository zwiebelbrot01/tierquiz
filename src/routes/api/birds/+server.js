export async function GET() {
    const url = "https://www.xeno-canto.org/api/2/recordings?query=bird";

    try {
        const response = await fetch(url);
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Fehler beim Abrufen der API-Daten" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
