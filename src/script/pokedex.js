/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
// eslint-disable-next-line camelcase
const get_json = (url) => {
  return fetch(url)
      .then((it) => it.json());
};

// eslint-disable-next-line camelcase
const includes = (search_in, search_for) => {
  return search_in.toLowerCase()
      .includes(search_for.toLowerCase());
};

class pokedex {
  constructor(baseURL_pokedex, show_pokemon = 30) {
    this.next_page = `${baseURL_pokedex}?limit=${show_pokemon}&offset=0`;
    this.current_page = null;
    this.prev_page = null;
    this.cache = {};
  }

  get_loaded_pokemon = () => {
    return Object.values(this.cache).flat(1);
  };

  get_page = async (url) => {
    if (url in this.cache) {
      return this.cache[url];
    }

    const {results, next, previous} = await get_json(url);
    // eslint-disable-next-line max-len
    const pokemon_details = await Promise.all(results.map((it) => get_json(it.url)));

    this.current_page = url;
    this.next_page = next;
    this.prev_page = previous;
    this.cache[url] = pokemon_details;
    return pokemon_details;
  };

  get_next_page = () => {
    if (!this.next_page) {
      console.warn('You\'re on the last page already.', this.next_page);
      return [];
    }
    return this.get_page(this.next_page);
  };

  search_by_name = (keyword) => {
    const all_pokemon = this.get_loaded_pokemon();
    if (!keyword.length) {
      return all_pokemon;
    }

    return all_pokemon.filter((it) => includes(it.name, keyword));
  };
}

export {pokedex};
