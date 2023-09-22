<script setup lang="ts">
import type { VDataTableHeader } from "@morpheme/table"
import { useProductStore } from "~/stores/productStore"
import { ProductType } from "~/type";

const productStore = useProductStore()
const headers = ref<VDataTableHeader[]>([
  {
    value: "image",
    text: "Image",
  },
  {
    value: "title",
    text: "Name",
  },
  {
    value: "price",
    text: "Price",
  },
  {
    value: "category",
    text: "Category",
  },
  {
    value: "action",
    text: "Action",
    sortable: false,
    align: "center",
  },
])

definePageMeta({
  breadcrumbs: [
    {
      title: 'Products',
      to: '/products'
    },

  ]
})

const productDetail = ref<ProductType[]>([])
const detailProduct = (id: number): void => {
  isProductModalOpen.value = true
  productDetail.value = productStore.getProductById(id)
  console.log(productDetail)
}


const isDeleteConfirmationOpen = ref(false)
const isProductModalOpen = ref(false)
const productIdToDelete = ref<number>(0)

function openModal(id: number) {
  console.log(id)
  productIdToDelete.value = id
  isDeleteConfirmationOpen.value = true
  console.log(productIdToDelete.value)
}

function onDeleteConfirmation(id: number) {
  if (id !== null) {
    productStore.deleteProduct(id)
    isDeleteConfirmationOpen.value = false
  }
}

onMounted(async () => {
  await productStore.getProducts()
})

watch(() => productStore.searchValue, () => {
  productStore.getProductByTitle
})
</script>

<template>
  <div class="py-4">
    <h1 class="text-2xl lg:text-3xl font-semibold mb-1">Products</h1>
    <p class="text-gray-500">Manage your products here</p>
  </div>

  <VCard shadow="md" class="mt-4">
    <div class="flex justify-between mb-6">
      <VInput v-model="productStore.searchValue" prepend-icon="ri:search-line" placeholder="Search..." />
      <NuxtLink to="/products/add">
        <VBtn prefix-icon="ri:add-fill" color="primary">
          Tambah
        </VBtn>
      </NuxtLink>
    </div>
    <VDataTable :items="productStore.products" :headers="headers" :loading="productStore.isLoading">
      <template #item.image="{ item }">
        <div class="rounded w-12 h-12">
          <img :src="item.thumbnail" class="w-full h-full object-cover" alt="" />
        </div>
      </template>
      <template #item.action="{ item }">
        <TableActions :id="item.id" path="/products" @deleteProduct="openModal($event)"
          @openDetail="detailProduct($event)" />
      </template>
    </VDataTable>
  </VCard>

  <VModal v-model="isDeleteConfirmationOpen" title="Delete Item" confirm confirm-text="Delete" confirm-color="error"
    centered footer-class="flex-row-reverse" close-text="Cancel" @confirm="onDeleteConfirmation(productIdToDelete)">
    <p>Are you sure want to delete this item?</p>
  </VModal>

  <v-modal v-model="isProductModalOpen" width="300px" :style="{
    '--v-modal-bg-color': '#fff',
    '--v-modal-shadow': 'none',
  }" modal-class="backdrop-blur-sm text-gray-500">
    <template #header>
      Product detail
    </template>
    <div>
      <VInput text :model-value="`${productDetail.title}`" label="Nama Product" class="mb-3"/>
      <VInput text :model-value="`${'$.' + productDetail.price}`" label="Harga" class="mb-3"/>
      <VInput text :model-value="`${productDetail.description}`" label="Deskripsi"/>
    </div>
    <template #footer class="justify-start">
      <div></div>
    </template>
  </v-modal>
</template>
