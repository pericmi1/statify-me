export async function load() {
    try {
        const res = await fetch('https://zenquotes.io/api/random');
        if (!res.ok) throw new Error("Fehler beim Laden des Zitats");

        const data = await res.json();
        const quote = data[0]?.q;
        const author = data[0]?.a;

        return {
            quote,
            author
        };
    } catch (error) {
        console.error("Zitat konnte nicht geladen werden:", error);
        return {
            quote: "Das Leben ist wie ein Fahrrad. Man muss sich vorwärts bewegen, um das Gleichgewicht nicht zu verlieren.",
            author: "Albert Einstein"
        };
    }
}