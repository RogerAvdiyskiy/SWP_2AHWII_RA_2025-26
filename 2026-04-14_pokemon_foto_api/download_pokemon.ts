const getRandomPokemonId = () => Math.floor(Math.random() * 1010) + 1;

async function downloadPokemon() {
    const pokemonId = getRandomPokemonId();
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonId}.png`;
    
    const dir = "./pokemon_bilder";
    await Deno.mkdir(dir, { recursive: true });
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Fehler beim Abrufen: ${response.status}`);
    }
    
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    const filename = `${dir}/pokemon_${pokemonId}.png`;
    await Deno.writeFile(filename, bytes);
    
    console.log(`Pokemon #${pokemonId} gespeichert: ${filename}`);
    return filename;
}

try {
    const file = await downloadPokemon();
    console.log("Fertig!");
} catch (e) {
    if (e instanceof Error) {
        console.log("Fehler:", e.message);
    } else {
        console.log("Fehler:", e);
    }
}
