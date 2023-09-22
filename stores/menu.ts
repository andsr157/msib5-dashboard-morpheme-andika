import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isAsideOpen: ref<boolean>(true),
    isMini: ref<boolean>(false),
    modalProduct: ref<boolean>(false),

  }),
  getters: {
  },
  actions: {

  },

})
