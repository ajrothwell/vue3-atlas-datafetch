<script setup lang="ts">

import { ref } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute();
console.log('AddressShow setup, route.params:', route.params, 'route:', route);
// const address = ref(route.params.address);

const props = defineProps({
  address: String
});

</script>

<template>
  <section>

    <div class="columns">
      <div class="column is-12">
        {{ address }}
      </div>
    </div>

    <div class="columns">
      <div class="column is-4 topic">
        Property
      </div>
    </div>

    <div class="columns">
      <div class="column is-4 topic">
        Deeds
      </div>
    </div>

  </section>

</template>

<style scoped>

.topic {
  height: 2em;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 2em;
}



</style>