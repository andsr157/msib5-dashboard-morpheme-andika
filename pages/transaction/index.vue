<script setup lang="ts">
import type { VDataTableHeader } from '@morpheme/table'
import { useMenuStore } from "~/stores/menu"
import { ref } from 'vue'

const menuStore = useMenuStore()
const selectedTab = ref(0)
const items = ref([
  {
    text: 'Pending',
  },
  {
    text: 'Sending',
  },
  {
    text: 'Complete',
  },
])

definePageMeta({
  breadcrumbs: [
    {
      title: 'Transaction',
      to: '/transaction'
    },
  ]
})

const headers = ref<VDataTableHeader[]>([

  {
    value: 'ordernumber',
    text: 'Order Number',
  },
  {
    value: 'title',
    text: 'Product Name',
  },
  {
    value: 'quantity',
    text: 'Quantity',
  },
  {
    value: 'phone',
    text: 'Phone Number',
  },
  {
    value: 'address',
    text: 'Address',
    sortable: false,
  },
])

onMounted(() => {
  menuStore.isAsideOpen = false
})
</script>

<template>
  <div class="py-4">
    <h1 class="text-2xl lg:text-3xl font-semibold mb-1">
      Transactions
    </h1>
    <p class="text-gray-500">
      Monitor your transaction here
    </p>
  </div>

  <VCard>
    <VTabs v-model="selectedTab" :items="items" />

    <div class="mt-4 px-2">
      <div v-if="selectedTab === 0">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          Pending
        </h3>
        <VDataTable :headers="headers" :item="[]" />
      </div>
      <div v-if="selectedTab === 1">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          Sending
        </h3>
        <VDataTable :headers="headers" :item="[]" />
      </div>
      <div v-if="selectedTab === 2">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          Complete
        </h3>
        <VDataTable :headers="headers" :item="[]" />
      </div>
    </div>
  </VCard>
</template>
