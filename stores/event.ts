export const useEventStore = defineStore('event', {
    state: () => ({
      allEvents: [],
    }),
    getters: {
      getAllEvents: (state) => state.allEvents
    },
    actions: {
      async setAllEvents(items: []) {
        this.allEvents = items 
      },
    }
  })
  