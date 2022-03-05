import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualityReducer from './qualities'
import professionReducer from './professions'

const rootReducer = combineReducers({
  qualities: qualityReducer,
  professions: professionReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
