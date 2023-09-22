import type { Component } from 'nuxt/schema'
import { Ref } from 'vue';

export interface MenuItem {
  text?: string
  to: string
  icon: Component
  children: MenuItem[]
}

export interface ProductType {
  id: number
  title: string
  price: number
  description?: string
  discountpercentage?: number
  rating?: number
  stock?: number
  category?: string
  brand?: string
  thumbnail?: string
  images?: string[]
  image?: string
}

export interface FormType {
  title: string
  price: number
  description: string
  thumbnail:string
  category:string
}

export interface stateProduct {
  initialproducts:ProductType[]
  products:ProductType[]
  searchValue: Ref<string>
  categoryValue: Ref<string[]>
  isLoading:boolean
  form: Ref<FormType>
}