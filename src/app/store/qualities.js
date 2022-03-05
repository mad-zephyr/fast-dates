import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entites: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesRecived: (state, action) => {
      state.entites = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequestFiled: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

const { actions, reducer: qualityReducer } = qualitiesSlice
const { qualitiesRequested, qualitiesRecived, qualitiesRequestFiled } = actions

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true
  }
  return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const lastFetch = getState().qualities.lastFetch
  if (isOutDated(lastFetch)) {
    console.log(lastFetch)
    dispatch(qualitiesRequested())
    try {
      const { content } = await qualityService.fetchAll()
      dispatch(qualitiesRecived(content))
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message))
    }
  }
}

export const getQualities = () => (state) => state.qualities.entites
export const getQualitiesLoadingStatus = () => (state) => state.isLoading
export const getQualitiesById = (qualitiesID) => (state) => {
  if (state.qualities.entites) {
    const qualitiesArr = []
    for (const qualIds of qualitiesID) {
      for (const quality of state.qualities.entites) {
        if (quality._id === qualIds) {
          qualitiesArr.push(quality)
          break
        }
      }
    }
    return qualitiesArr
  }
  return []
}

export default qualityReducer
