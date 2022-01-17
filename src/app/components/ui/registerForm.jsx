import React, { useState, useEffect } from 'react'
import {
  TextField,
  SelectField,
  RadioField,
  MultiSelectField,
  CheckBoxField
} from '../common/form'

import validatorConfig from '../../utils/validatorConfig'
import api from '../../api'
import { validator } from '../../utils/validator'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    reTypePassword: '',
    profession: '',
    sex: 'Other',
    qualities: [],
    licence: false
  })

  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState({})

  const handleChange = ({ target }) => {
    if (target) {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
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
          options={professions}
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
          options={qualities}
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
