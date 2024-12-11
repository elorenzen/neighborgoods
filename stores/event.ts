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
      async getUserEvents(id:any) {
        return this.allEvents.filter((i:any) => i.associated_users.includes(id))
      }
    }
  })
  