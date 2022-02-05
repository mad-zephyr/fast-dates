import httpService from './http.services'

const QualityEndPoint = 'quality/'

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(QualityEndPoint)
    return data
  }
}

export default qualityService
