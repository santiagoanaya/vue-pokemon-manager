<template>
  <v-text-field
    v-model="searchTerm"
    label="Search"
    outlined
    dense
    @input="debouncedSearch"
    class="search-bar"
    background-color="white"
  >
    <v-icon slot="prepend-inner" class="search-icon"> mdi-magnify </v-icon>
  </v-text-field>
</template>

<script>
import { debounce } from 'lodash'
import '@mdi/font/css/materialdesignicons.css'

export default {
  data() {
    return {
      searchTerm: '',
    }
  },
  created() {
    this.debouncedSearch = debounce(this.search, 300)
  },
  methods: {
    search() {
      this.$emit('search', this.searchTerm)
    },
  },
}
</script>

<style scoped>
.search-bar input {
  font-family: 'Montserrat', sans-serif;
  color: gray;
}
</style>
