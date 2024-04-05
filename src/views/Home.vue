<script setup lang="ts">

import { ref } from 'vue';

const address = ref('');

const handleSearch = async () => {
  console.log('searching for:', address.value);
  const baseURL = `https://api.phila.gov/ais/v1/search/${encodeURIComponent(address.value)}`;
  const response = await fetch(baseURL)
  const data = await response.json()
}


</script>

<template>
  <main>
    <div class="container">
      <div class="columns">
        <input
          class="input column is-6"
          type="text"
          placeholder="Search an address"
          v-model="address"
        />
        <button
          class="button"
          @click="handleSearch"
        >
          Search
        </button>
      </div>
    </div>
  </main>
</template>
