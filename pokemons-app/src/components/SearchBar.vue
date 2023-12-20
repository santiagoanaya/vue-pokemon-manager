<template>
  <v-text-field
    v-model="searchTerm"
    label="Search"
    outlined
    @input="debouncedSearch"
  ></v-text-field>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      searchTerm: '',
    }
  },
  methods: {
    debouncedSearch: debounce(function () {
      // searching logic
    }, 300),
  },
}
</script>
