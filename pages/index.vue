<script setup lang="ts">
import { useMenuStore } from "~/stores/menu"

const menuStore = useMenuStore()
onMounted(() => {
 menuStore.isAsideOpen = false
})
</script>

<template>
  <div class="py-4">
    <h1 class="text-2xl lg:text-3xl font-semibold mb-1">Dashboard</h1>
    <p class="text-gray-500">
      Monitor your metrics for shipping, transactions, product and many more in here
    </p>
    <CardStatistic />
  </div>
</template>

