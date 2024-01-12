<template>
  <login-admin v-if="systemType === 'admin'" />
  <login-customer v-else />
</template>

<script setup lang="ts">
import loginAdmin from './loginAdmin.vue';
import loginCustomer from './homepage/index.vue';

const systemType = import.meta.env.VITE_SYSTEM_TYPE;
</script>
