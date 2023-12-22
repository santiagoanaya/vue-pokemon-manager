import axios from 'axios'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemons = async (limit = 25) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}`)
  return response.data.results.map((pokemon) => ({
    ...pokemon,
    id: extractIdFromUrl(pokemon.url),
  }))
}

export const fetchPokemonDetails = async (name) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`)
  return response.data
}

const extractIdFromUrl = (url) => {
  return Number(url.split('/').filter(Boolean).pop())
}
