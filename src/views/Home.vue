<script setup lang="ts">

import { useRouter } from 'vue-router';
const router = useRouter();

console.log('Home setup');//, route:', route);

import { ref, computed } from 'vue';

const address = ref('');

const handleSearch = () => {
  console.log('searching for:', address.value);
  router.push({ name: 'address', params: { address: address.value } });
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
          @submit="handleSearch"
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
