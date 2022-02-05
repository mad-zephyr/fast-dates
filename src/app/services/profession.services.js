import httpService from './http.services'

const ProfessionEndPoint = 'profession/'

const professionService = {
  get: async () => {
    const { data } = await httpService.get(ProfessionEndPoint)
    return data
  }
}

export default professionService
