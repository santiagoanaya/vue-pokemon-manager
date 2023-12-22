<template>
  <v-icon
    @click.stop="toggleFavorite"
    :color="isFavorite ? 'orange' : 'grey'"
    size="44"
    class="grey lighten-2 rounded-circle"
  >
    mdi-star
  </v-icon>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.pokemon)
    },
  },
}
</script>
