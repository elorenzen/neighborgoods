export const useItemStore = defineStore('item', {
    state: () => ({
      allItems: [],
    }),
    getters: {
    },
    actions: {
      async setAllItems(items: []) {
        this.allItems = items 
      },
      async getUserItems(id:any) {
        return this.allItems.filter(i => i.creator_id == id)
      }
    }
  })
  