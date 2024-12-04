export const useItemStore = defineStore('item', {
    state: () => ({
      allItems: [],
    }),
    getters: {
      getallItems: (state) => state.allItems,
      getAllItemsForSale: (state) => state.allItems.filter(e => e.status == 'For Sale')
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
  