class Pokemones {
    pokemones;

    constructor(pokemones) {
        this.pokemones = pokemones
    }

    getPokemones() {
        return this.pokemones;
    }

    getPokemon(id) {
        return this.pokemones.find((pokemon) => pokemon.id == id);
    }

    addPokemon(pokemon) {
        this.pokemones.length === 0 ? (pokemon.id = 1) : (pokemon.id = this.pokemones.length + 1);
        this.pokemones.push(pokemon);
    }

    updatePokemon(id, pokemon) {
        const updated = this.pokemones.find(pokemon => pokemon.id == id);
        if (updated) {
            return Object.assign(updated, pokemon);
        }
    }

    deletePokemon(id) {
        this.pokemones = this.pokemones.filter(pokemon => pokemon.id != id);
    }
}

export default Pokemones;