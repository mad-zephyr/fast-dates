import httpService from './http.services'

const UserEndPoin = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(UserEndPoin)
    return data
  }
}

export default userService
