import React, { useState, useEffect } from 'react'
import { TextField, CheckBoxField } from '../common/form'
import { validator } from '../../utils/validator'

const LoginForm = (params) => {
  const [data, setData] = useState({ email: '', password: '', login: false })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }
  return (
    <>
      <h3 className="mb-4">Login</h3>
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
        <CheckBoxField
          onChange={handleChange}
          value={data.login}
          name='login'
          error={errors.login}
        > Оставаться с системе</CheckBoxField>
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

export default LoginForm
