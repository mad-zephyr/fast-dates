import React, { useState, useEffect } from 'react'
import {
  TextField,
  SelectField,
  RadioField,
  MultiSelectField,
  CheckBoxField
} from '../common/form'

import validatorConfig from '../../utils/validatorConfig'
import { validator } from '../../utils/validator'
import { useQualities } from '../../hooks/useQualities'
import { useProfession } from '../../hooks/useProfession'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: '',
    password: '',
    reTypePassword: '',
    profession: '',
    sex: 'Other',
    qualities: [],
    licence: false
  })

  const { qualities } = useQualities()
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))
  const { professions } = useProfession()
  const professionsList = professions.map(prof => ({ label: prof.name, value: prof._id }))
  const [errors, setErrors] = useState({})
  const { signUp } = useAuth()

  const handleChange = ({ target }) => {
    if (target) {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const userData = {
      ...data,
      qualities: data.qualities.map(qualitiesId => qualitiesId.value)
    }
    try {
      await signUp(userData)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Электронная почта"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Пароль"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <TextField
          label="Повторите пароль"
          type="password"
          name="reTypePassword"
          value={data.reTypePassword}
          onChange={handleChange}
          error={errors.reTypePassword}
        />
        <SelectField
          options={professionsList}
          label='Выбрать профессию'
          onChange={handleChange}
          name='profession'
          defaultOption='Выбрать профессию...'
          value={data.profession}
          error={errors.profession}
        />
        <RadioField
          options={[
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
            { name: 'Other', value: 'Other' }
          ]}
          label='Выберите ваш пол: '
          name='sex'
          value={data.sex}
          error={errors.profession}
          onChange={handleChange}
        />
        <MultiSelectField
          name='qualities'
          label='Ваши качества'
          options={qualitiesList}
          value={data.qualities}
          onChange={handleChange}
          error={errors.qualities}
        />
        <CheckBoxField
          onChange={handleChange}
          value={data.licence}
          name='licence'
          error={errors.licence}
        > Подтвердить лицензионное <a href='/'>соглашение</a></CheckBoxField>
        <button
          className="btn btn-primary w-100 mx-auto mb-3"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default RegisterForm
