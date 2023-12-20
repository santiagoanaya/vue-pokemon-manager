<template>
    <div>
        <SearchBar />
        <PokemonList />
        <div class="buttons">
            <v-btn @click="showAllPokemons">Show All Pokemons</v-btn>
            <v-btn @click="showFavorites">Show Favorites</v-btn>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import PokemonList from '@/components/PokemonList.vue';

export default {
    components: {
        SearchBar,
        PokemonList,
    },
    methods: {
        ...mapActions(['showAllPokemons', 'showFavorites']),
    },
};
</script>

<style>
.buttons {
    margin-top: 20px;
}
</style>
