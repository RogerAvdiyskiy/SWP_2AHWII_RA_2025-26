const getRandomPokemonUrl = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${randomId}.png`;
};

async function holePokemon() {
    const url = getRandomPokemonUrl();
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Pokemons: " + response.status);
    }
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = imgUrl;
    
    loeschePokemon();
    
    const container = document.getElementById("pokemon-container");
    if (container) {
        container.appendChild(img);
    }
}

function loeschePokemon() {
    const container = document.getElementById("pokemon-container");
    if (container) {
        container.innerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const holeButton = document.getElementById("hole-pokemon");
    const loescheButton = document.getElementById("loesche-pokemon");
    
    if (holeButton) {
        holeButton.addEventListener('click', holePokemon);
    }
    
    if (loescheButton) {
        loescheButton.addEventListener('click', loeschePokemon);
    }
});
