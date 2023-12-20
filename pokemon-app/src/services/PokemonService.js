import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

// List of pokemons
export const fetchPokemonList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching pokemon list:', error);
        throw error;
    }
};

// Pokemon detail
export const fetchPokemonDetails = async (pokemonName) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${pokemonName}:`, error);
        throw error;
    }
};
