export const useEventStore = defineStore('event', {
    state: () => ({
      allEvents: [],
    }),
    getters: {
    },
    actions: {
      async setAllEvents(items: []) {
        this.allEvents = items 
      },
    }
  })
  