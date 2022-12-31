import 'regenerator-runtime';
import './styles/style.css';
import './script/main-title.js';
import { colors, baseURL_pokedex } from "./script/element.js";
import { pokedex } from "./script/pokedex.js";

const pokemon_container = document.querySelector(".pokemon_container");
const input_search = document.querySelector("#search_input");
const pokemon = new pokedex(baseURL_pokedex);

const load_next_page = async() => 
{
    const pokemons = await pokemon.get_next_page();
    pokemons.forEach(create_pokemon_container);
}

input_search.addEventListener("input", () => 
{
    pokemon_container.innerHTML = "";
    pokemon.search_by_name(input_search.value).forEach(create_pokemon_container);
});

window.addEventListener('load', load_next_page);
document.querySelector("#load_button").addEventListener("click", load_next_page);

const create_pokemon_container = pokemon => 
{
    const { name, weight } = pokemon;
    const id = pokemon.id.toString().padStart(3, "0");
    const type = pokemon.types[0].type.name

    const pokemon_element = document.createElement("div");
    pokemon_element.classList.add("pokemon_box");
    pokemon_element.style.backgroundColor = colors[type];
    pokemon_element.innerHTML = pokemon_html(id, name, weight, type)
    pokemon_container.appendChild(pokemon_element);
}

const pokemon_html = (id, name, weight, type) => 
{
    return `
        <img
            class="pokemon_img"
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
            alt="${name} Pokemon"
        />
        <h3 class="pokemon_name">${name}</h3>
        <p class="pokemon_id"># ${id}</p>
        <p class="pokemon_weight">${weight} kg</p>
        <p class="pokemon_type">Type : ${type}</p>
    `
}

const disable_enter = (e) => {
    e = e || event;
    var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
    return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
}

document.querySelector('#search_input').onkeypress = disable_enter;