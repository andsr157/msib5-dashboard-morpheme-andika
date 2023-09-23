<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { watchEffect } from 'vue'
import { useMenuStore } from '~/stores/menu'

const menuStore = useMenuStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')

watchEffect(() => {
  menuStore.isAsideOpen = !isMobile.value
})


</script>

<template>
  <VAppShell padded-content>
    <template #header>
      <HeaderMain />
    </template>

    <template #navigation>
      <HeaderBreadcrumbs/>
    </template>

    <template #aside>
      <VNavDrawer
        v-model="menuStore.isAsideOpen"
        v-model:mini="menuStore.isMini"
        sticky
        color="primary"
        :fixed="isMobile"
        :overlay="isMobile"
        :close-on-overlay-click="isMobile"
        :class="[!isMobile ? '[--nav-drawer-width:308px]' : '[--nav-drawer-width:80%]', { 'z-20': isMobile }] "
        bordered
        style="height: 100%;"
      >
        <NavigationSideMenu :ismobile="!isMobile" />
      </VNavDrawer>
    </template>

    <slot />
  </VAppShell>
</template>

<style>
.v-list .router-link-exact-active {
  background-color: #0984dd;
}
</style>
