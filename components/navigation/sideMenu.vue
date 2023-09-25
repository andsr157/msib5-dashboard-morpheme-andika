<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'

const { ismobile } = defineProps<{ ismobile: boolean }>()
const menuStore = useMenuStore()
const menus = ref([
  {
    title: 'Home',
    to: '/',
    prependIcon: 'foundation:home',
  },
  {
    title: 'Products',
    to: '/products',
    prependIcon: 'ri:box-3-line',
  },
  {
    title: 'Transaction',
    to: '/transaction',
    prependIcon: 'ri:wallet-fill',
  },
])

</script>

<template>
  <div :class="`flex  ${menuStore.isMini ? 'px-3 justify-center' : 'px-6 justify-between'
    } py-3`">
    <VLogo v-if="!menuStore.isMini" white to="/"></VLogo>
    <VBtn v-show="ismobile" color="purple-heart" class="py-1 rounded-lg" @click="menuStore.isMini = !menuStore.isMini">
      <VIcon name="foundation:list" size="xs" style="color: #ffffff" />
    </VBtn>
  </div>

  <VList active-variant="filled">
    <template v-for="menu in menus" :key="menu.title">
      <VListItem :to="menu.to" :prepend-icon="menu.prependIcon" prepend-class="ms-1" style="color: #ffffff; height: 40px">
        <p class="text-white text-base">
          {{ menu.title }}
        </p>
      </VListItem>
    </template>
  </VList>
</template>
