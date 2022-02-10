import httpService from './http.services'

const UserEndPoin = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(UserEndPoin)
    return data
  },
  create: async (payload) => {
      const { data } = await httpService.put(UserEndPoin + payload._id, payload)
      return data
    }
}

export default userService
