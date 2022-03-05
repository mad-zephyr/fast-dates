import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entites: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsRecived: (state, action) => {
      state.entites = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFiled: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

const { actions, reducer: professionReducer } = professionsSlice
const { professionsRequested, professionsRecived, professionsRequestFiled } = actions

function isOutDated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true
  }
  return false
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const lastFetch = getState().professions.lastFetch
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested())
    try {
      const { content } = await professionService.get()
      dispatch(professionsRecived(content))
    } catch (error) {
      dispatch(professionsRequestFiled(error.message))
    }
  }
}

export const getProfessions = () => (state) => state.professions.entites
export const getProfessionsLoadingStatus = () => (state) => state.isLoading
export const getProfessionById = (professionId) => (state) => {
  if (state.professions.entites) {
    for (const profession of state.professions.entites) {
        if (profession._id === professionId) {
          return profession
        }
      }
  }
  return []
}

export default professionReducer
