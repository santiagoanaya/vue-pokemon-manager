<template>
  <v-card v-if="selectedPokemon">
    <PokeballLoader v-if="isLoadingDetails"></PokeballLoader>
    <!-- there is an issue with this loader displaying inside the card -->
    <v-img
      :src="selectedPokemon.sprites.front_default"
      height="300"
      class="mb-4"
      v-else
    ></v-img>
    <v-btn icon class="close-button" @click="closeCard">
      <v-icon size="26">mdi-close-circle</v-icon>
    </v-btn>
    <v-divider></v-divider>
    <v-card-text class="mt-5">
      <div
        class="detail-item"
        v-for="(value, name) in pokemonDetails"
        :key="name"
      >
        <span class="detail-label">{{ name }}:</span>
        <span class="detail-value mb-5">{{ value }}</span>
        <v-divider></v-divider>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-chip
        text
        class="bottom-nav-button"
        color="red lighten-1"
        text-color="white"
        @click="shareToFriends"
        >Share to my friends</v-chip
      >
      <v-btn icon @click="toggleFavorite">
        <v-icon
          :color="isFavorite ? 'orange' : 'grey'"
          size="36"
          class="grey lighten-2 rounded-circle"
          >mdi-star
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '@/utils'
import PokeballLoader from '@/components/PokeballLoader.vue'

export default {
  components: { PokeballLoader },
  computed: {
    ...mapState(['selectedPokemon']),
    ...mapGetters(['isLoadingDetails']),
    isFavorite() {
      return this.selectedPokemon
        ? this.$store.getters.isFavorite(this.selectedPokemon.id)
        : false
    },
    pokemonDetails() {
      const { name, weight, height, types } = this.selectedPokemon
      return {
        Name: capitalizeFirstLetter(name),
        Weight: weight,
        Height: height,
        Types: this.formatTypes(types),
      }
    },
  },
  methods: {
    closeCard() {
      this.$emit('close')
    },
    async shareToFriends() {
      const { name, weight, height, types } = this.selectedPokemon
      const pokemonToCopy = `${capitalizeFirstLetter(
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
    toggleFavorite() {
      this.$store.commit('toggleFavorite', this.selectedPokemon)
    },
    formatTypes(types) {
      return types
        .map((type) => capitalizeFirstLetter(type.type.name))
        .join(', ')
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
  margin-bottom: 10px;
}
.detail-label {
  font-weight: bold;
  font-size: 18px;
  font-family: 'Lato', sans-serif;
}
.detail-value {
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  flex-grow: 1;
  text-align: left;
}
detail-value {
  font-size: 18px;
  font-family: 'Lato', sans-serif;
}
</style>
