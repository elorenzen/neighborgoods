export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    coordinates: '',
    users: [],
    description: ''
  }),
  getters: {
    getUser: (state: any) => state.user,
    getAllUsers: (state: any) => state.users,
    getUserLocation: (state: any) => state.coordinates
  },
  actions: {
    async setUser(userParam: any) {
      if (userParam) this.user = userParam
      else this.user = null
    },
    async setAllUsers(users: []) {
      this.users = users
    },
    async setUserLocation(coordinates: any) {
      this.coordinates = coordinates
    }
  }
})
