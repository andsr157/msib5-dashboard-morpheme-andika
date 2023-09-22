<script setup lang="ts">
import { useMenuStore } from "~/stores/menu"
const menuStore = useMenuStore()
</script>

<template>
  <VAppBar shadow="sm" class="flex py-3 px-0 justify-between lg:!hidden">
   
    <VLogo size="sm" />
    <VBtn
    color="primary"
      class="px-2 py-1 rounded-lg"
      @click="menuStore.isAsideOpen = !menuStore.isAsideOpen"
    >
      <VIcon name="foundation:list" size="xs" style="color: #ffffff" />
    </VBtn>
  </VAppBar>
</template>
