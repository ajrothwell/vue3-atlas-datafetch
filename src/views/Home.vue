<script setup lang="ts">
console.log('Home setup');//, route:', route);

import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { ref, watch } from 'vue';

const address = ref('');

const handleSearch = () => {
  if (address.value) {
    router.push({ name: 'address', params: { address: address.value } });
  }
}

// Create a ref to store the previous route path
const previousRoutePath = ref('');

// Use the router's navigation guard to track route changes
router.beforeEach((to, from, next) => {
  previousRoutePath.value = from.fullPath;
  next();
});

watch(route, (newValue, oldValue) => {
  if (newValue.params.address !== previousRoutePath.value) {
    fetchAISData(newValue.params.address);
  }
});

const fetchAISData = async (address: string) => {
  const baseURL = `https://api.phila.gov/ais/v1/search/${encodeURIComponent(address)}`;
  const response = await fetch(baseURL)
  const data = await response.json()
  console.log('fetchAISData, address:', address, 'data:', data);
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
        <!-- I could not use a router-link here because the address is null at the start,
          and it would throw an error for a missing param
        -->
        <button
          class="button"
          @click="handleSearch"
        >
          Search
        </button>
      </div>

      <router-view v-slot="{ Component }">
        <component
          :is="Component"
        />
        <!-- :address="address" -->
      </router-view>

    </div>
  </main>
</template>
