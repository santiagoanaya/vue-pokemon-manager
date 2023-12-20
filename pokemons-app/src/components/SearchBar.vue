<template>
  <v-text-field
    v-model="searchTerm"
    label="Search"
    outlined
    dense
    prepend-icon="mdi-magnify"
    @input="debouncedSearch"
  ></v-text-field>
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
