<script setup lang="ts">

import { useAddressStore } from '@/stores/AddressStore.ts'
const AddressStore = useAddressStore();
import { useParcelsStore } from '@/stores/ParcelsStore.ts'
const ParcelsStore = useParcelsStore();
import { useOpaStore } from '@/stores/OpaStore.ts'
const OpaStore = useOpaStore();
import { useLiStore } from '@/stores/LiStore.ts'
const LiStore = useLiStore();

import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { ref, watch } from 'vue';

// fetching AIS was originally done with a composable, but moved to the store
// import useAddressRequest from '../composables/useAddressRequest.ts';
// const { addressData, fetchAddress } = useAddressRequest();

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

// watch the route to know when to geocode
watch(route, async (newValue, oldValue) => {
  if (newValue.params.address !== previousRoutePath.value) {
    await AddressStore.fillAddressData(newValue.params.address);
    await ParcelsStore.fillPwdParcelData();
    await ParcelsStore.fillDorParcelData();
    await OpaStore.fillOpaData();
    await LiStore.fillLiInspections();
    await LiStore.fillLiPermits();
  }
});

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
      </router-view>

    </div>
  </main>
</template>
