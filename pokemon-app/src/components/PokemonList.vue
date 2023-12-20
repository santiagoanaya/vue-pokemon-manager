<template>
    <div>
        <v-list>
            <v-list-item v-for="pokemon in pokemons" :key="pokemon.id">
                <v-list-item-content>
                    <v-list-item-title>{{ pokemon.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-icon @click="toggleFavorite(pokemon)">
                        {{ isFavorite(pokemon) ? 'mdi-star' : 'mdi-star-outline' }}
                    </v-icon>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pokemons: [
                { id: 1, name: 'Pikachu' },
                { id: 2, name: 'Charizard' },
                { id: 3, name: 'Bulbasaur' },
                // Add more pokemons here...
            ]
        };
    },
    methods: {
        toggleFavorite(pokemon) {
            this.$store.commit('toggleFavorite', pokemon);
        },
        isFavorite(pokemon) {
            return this.$store.getters.isFavorite(pokemon);
        }
    }
};
</script>
