<script setup lang="ts">

const { path, id } = defineProps<{
  id: number
  path: string }>()

const emits = defineEmits(['deleteProduct','openDetail'])

function confirmDelete(id: number) {
  emits('deleteProduct', id)
}

function confirmDetail(id: number) {
  emits('openDetail', id)
}
</script>

<template>
  <div class="flex justify-center gap-4">
    <VBtn icon fab @click="confirmDetail(id)" color="detail">
      <VIcon name="ri:eye-line" />
    </VBtn>
      <VBtn icon fab :to="`/products/edit/${id}`" color="edit">
        <VIcon name="ri:pencil-line" />
      </VBtn>
    <VBtn icon fab @click="confirmDelete(id)" color="delete">
      <VIcon name="ri:delete-bin-line" />
    </VBtn>
  </div>
</template>
