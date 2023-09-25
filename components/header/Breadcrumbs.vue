<script setup lang="ts">
import type { VBreadcrumbItemProps } from '@morpheme/breadcrumbs'
import { Home02Icon } from '@morphemeicons/vue/untitled'
const route = useRoute()
const items = computed<VBreadcrumbItemProps[]>(() => {
  return (route.meta.breadcrumbs ?? []) as VBreadcrumbItemProps[]
})
</script>
<template>
  <div class="container mx-auto px-4 pt-6">
    <VBreadcrumbs>
      <VBreadcrumbsItem to="/">
        <Home02Icon class="w-6 h-6 p-1" />
      </VBreadcrumbsItem>
      <VBreadcrumbsDivider />
      <div v-for="item, index in items" :key="item.title">
        <VBreadcrumbsItem :to="item.to">
          {{ item.title }}
        </VBreadcrumbsItem>
        <VBreadcrumbsDivider v-if="items.length - 1 !== index" />
      </div>
    </VBreadcrumbs>
  </div>
</template>
<style lang="scss">
:root {
    --breadcrumbs-item-active-color: var(--purple-heart-500);
    --breadcrumbs-item-active-bg-color: var(--purple-heart-100);
    --breadcrumbs-item-hover-color: var(--purple-heart-800);
}
</style>