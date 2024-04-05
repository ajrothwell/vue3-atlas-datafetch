<script setup lang="ts">

// import { useRoute } from 'vue-router';
// const route = useRoute();

console.log('Home setup');//, route:', route);

import { ref, computed } from 'vue';

const address = ref(null);
const urlAddress = computed(() => {
  if (address.value === '') {
    return '';
  } else {
    return encodeURIComponent(address.value);
  }
})

// const handleSearch = () => {
//   console.log('searching for:', address.value);
// }

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
        <router-link
          :to="{ name: 'address', params: { urlAddress: urlAddress }}"
        >
          <button
            class="button"
          >
            <!-- @click="handleSearch" -->
            Search
          </button>
        </router-link>
      </div>

      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :address="address"
        />
      </router-view>

      
    </div>
  </main>
</template>
