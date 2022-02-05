import httpService from './http.services'

const ProfessionEndPoin = 'profession/'

const professionService = {
  get: async () => {
    const { data } = await httpService.get(ProfessionEndPoin)
    return data
  }
}

export default professionService
