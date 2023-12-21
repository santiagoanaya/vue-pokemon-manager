<template>
  <v-card v-if="selectedPokemon">
    <v-img :src="selectedPokemon.sprites.front_default" height="200"></v-img>
    <v-btn icon class="close-button" @click="closeCard">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-divider></v-divider>
    <v-card-text>
      <div class="detail-item">
        <span class="detail-label">Name:</span>
        <span class="detail-value">{{
          capitalizeFirstLetter(selectedPokemon.name)
        }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Weight:</span>
        <span class="detail-value">{{ selectedPokemon.weight }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Height:</span>
        <span class="detail-value">{{ selectedPokemon.height }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Types:</span>
        <span class="detail-value">{{
          formatTypes(selectedPokemon.types)
        }}</span>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="shareToFriends">Share to my friends</v-btn>
      <v-btn icon @click="toggleFavorite">
        <v-icon>{{
          isFavorite(selectedPokemon.id) ? 'mdi-star' : 'mdi-star-outline'
        }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['selectedPokemon']),
    ...mapGetters({
      isFavorite: 'isFavorite',
    }),
  },
  methods: {
    closeCard() {
      this.$emit('close')
    },
    async shareToFriends() {
      const { name, weight, height, types } = this.selectedPokemon
      const pokemonToCopy = `${this.capitalizeFirstLetter(
        name
      )}, ${weight}, ${height}, Types: ${types.join(', ')}`

      try {
        // copy clipboard
        await navigator.clipboard.writeText(pokemonToCopy)
        this.$toast.success('Copied to clipboard')
      } catch (error) {
        this.$toast.error('Error copying to clipboard')
      }
    },
    toggleFavorite(pokemon) {
      this.$store.commit('toggleFavorite', pokemon)
    },
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatTypes(types) {
      return types.map((type) => type.type.name).join(', ')
    },
  },
}
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.detail-label {
  font-weight: bold;
}
</style>
