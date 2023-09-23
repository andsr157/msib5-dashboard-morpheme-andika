import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

import type { FormType, ProductType, stateProduct } from '~/type'

export const useProductStore = defineStore('Products', {
  state: (): stateProduct => ({
    initialproducts: [],
    constantproducts: [],
    products: [],
    searchValue: ref(''),
    categoryValue: ref([]),
    isLoading: true,
    form: ref({
      title: '',
      price: 0,
      description: '',
      thumbnail: 'https://picsum.photos/id/237/200/300',
      category: ''
    }),
  }),

  getters: {
    getAllProducts: (state) => {
      if (state.products?.length === 0) {
        state.products = [...state.initialproducts, ...(state.products || [])]
        return state.products
      }
      return state.products
    },

    getProductByTitle: (state): void => {

      if (state.searchValue === '') {
        state.products = state.constantproducts
      }
      else {
        const filtered = state.products.filter((item) => {
          const product = item.title.toLowerCase()
          return product.includes(state.searchValue.toLowerCase())
        })
        state.products = filtered
      }
    },


    getProductById: state => (id: number) => {
      if (state.products?.length === 0) {
        state.products = [...state.initialproducts, ...(state.products || [])]
      }
      const product = state.products.find(data => data.id === id)
      return product || null
    },
  },

  actions: {
    async getProducts() {
      try {
        this.isLoading = true
        const response = await axios.get('https://dummyjson.com/products')
        this.initialproducts = response.data.products

      }
      catch (error) {
        console.error('Error fetching products:', error)
      }
      finally {
        this.isLoading = false
      }
    },

    addProduct() {
      const id = {
        id: this.products.length + 1,
      }
      this.products.unshift({ ...id, ...this.form })
      this.form = {
        title: '',
        price: 0,
        description: '',
        thumbnail: 'https://picsum.photos/id/237/200/300',
        category: ''
      }
      this.constantproducts = this.products
      const router = useRouter();
      router.push('/products');
      window.alert('tambah berhasil')
    },

    deleteProduct(id: number): void {
      this.products = this.products.filter(item => item.id !== id)
    },

    editProduct(id: number): void {
     
      const productIndex = this.products.findIndex((product) =>  product.id === id )
      
      if (productIndex !== -1) {
        this.products[productIndex] = { ...this.products[productIndex], ...this.form }
        this.constantproducts = this.products
      }
      this.form = {
        title: '',
        price: 0,
        description: '',
        thumbnail: 'https://picsum.photos/id/237/200/300',
        category: ''
      }
      const router = useRouter();
      router.push('/products');
      window.alert('Edit Behasil')
    },

    fillEditFrom(data:ProductType):void {
      this.form = {
        title:data.title,
        price:data.price,
        description:data.description,
        thumbnail: 'https://picsum.photos/id/237/200/300',
        category:data.category
      }
    },

    resetForm(){
      this.form = {
        title:'',
        price:0,
        description:'',
        thumbnail: 'https://picsum.photos/id/237/200/300',
        category:''
      }
    }

  },
})
