<script setup lang="ts">
console.log('Home setup');//, route:', route);

import { useRouter } from 'vue-router';
const router = useRouter();

import { ref, computed } from 'vue';

const address = ref('');

const handleSearch = () => {
  console.log('searching for:', address.value);
  if (address.value) {
    router.push({ name: 'address', params: { address: address.value } });
  }
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
