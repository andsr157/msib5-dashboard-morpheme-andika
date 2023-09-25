<script setup lang="ts">
import { object, string, number } from "yup"
import { useForm } from "vee-validate"
import { useProductStore } from "~/stores/productStore"
import type { VSelectItem } from "@morpheme/select"
import { VQuillEditor } from "@morpheme/quill-editor"
import VEditor from "@morpheme/editor"

const productStore = useProductStore()
const value = ref('')
const imageUrl = ref<any>(null)
const fileInput = ref(null);
const items = ref<VSelectItem[]>([
  {
    text: "Laptops",
    value: "laptops",
  },
  {
    text: "Smartphones",
    value: "smartphones",
  },
  {
    text: "Foods",
    value: "foods",
  },
])

definePageMeta({
  breadcrumbs: [
    {
      title: 'Products',
      to: '/products'
    },
    {
      title: 'Add',
      to: '/products/add'
    }
  ]
})

const schema = object({
  title: string().required().label("name"),
  price: number().required().label("price"),
  category: string().required().label("category"),
  description: string().required().label("description"),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit((values) => {
  console.log('click')
  productStore.addProduct()
});

export type FileValue =
  | string
  | Record<string, any>
  | File
  | FileList
  | File[]
  | null;

const onChange = (val: FileValue) => {
  if (val instanceof File) {
    const file = val;
    imageUrl.value = URL.createObjectURL(file);
  } else if (val === null || typeof val === 'string') {
    imageUrl.value = val;
  }
  console.log(imageUrl)
};

onMounted(() => {
  productStore.resetForm()
})

</script>

<template>
  <div class="py-4 text-center">
    <h1 class="text-2xl lg:text-3xl font-semibold mb-1">Add Products</h1>
    <p class="text-gray-500">Add your products here</p>
  </div>



  <ClientOnly>
    <!-- ... -->
    <template #fallback>
      <VCard>
        <div class="flex flex-col gap-3">
          <VShimmer width="100%" height="130px"/>
          <div class="grid grid-cols-2 gap-4">
            <VShimmer width="100%" height="56px"/>
            <VShimmer width="100%" height="56px"/>
          </div>
          <VShimmer width="100%" height="56px"/>
          <VShimmer width="100%" height="86px"/>
          <VShimmer width="79px" height="44px"/>
          
        </div>
      </VCard>
    </template>
    <VCard class="mx-auto">
      <!-- <pre>{{ productStore.form }}</pre> -->
      <form @submit="onSubmit">
        <div v-if="imageUrl !== null">
          <img :src="imageUrl" class=" w-full h-72 object-cover mb-2">
          <VBtn color="error" outlined @click="imageUrl = null">Delete</VBtn>
        </div>
        <div v-else>
          
          <VFileUpload ref="fileInput" theme="image" name="image" full @change="onChange" />
        </div>
        <div class="grid grid-cols-2 gap-4 my-6">
          <VInput v-model="productStore.form.title" label="Name" name="title" />
          <VInput v-model="productStore.form.price" label="Price" name="price" type="number" />
        </div>
        <VSelect v-model="productStore.form.category" :items="items" label="Category" name="category" class="mb-6" />
        <VEditor name="description" v-model="productStore.form.description"/>
        <VBtn type="submit" color="purple-heart" class="mt-6"> Submit </VBtn>
      </form>
    </VCard>
  </ClientOnly>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none; 
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
