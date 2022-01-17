import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { MultiSelectField, RadioField, SelectField, TextField } from '../common/form'
import { validator } from '../../utils/validator'
import validatorConfig from '../../utils/validatorConfig'
import api from '../../api'

const UserEditForm = () => {
  const params = useParams()
  // eslint-disable-next-line no-unused-vars
  const history = useHistory()

  const { userId } = params
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'Other',
    qualities: []
  })

  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState()

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    uppdateAllUsers()
  }

  function uppdateAllUsers() {
    const UPPDATEDUSERS = JSON.parse(window.localStorage.getItem('users')).map(user => {
      if (user._id === data._id) {
        const normQuality = []
          for (const quality in data.qualities) {
            for (const name in qualities) {
              if (qualities[name]._id === data.qualities[quality].value) {
                normQuality.push(qualities[name])
              }
            }
          }
        return {
          ...data,
          qualities: normQuality
        }
      } else {
        return user
      }
    })
    console.log(UPPDATEDUSERS)
    window.localStorage.setItem('users', JSON.stringify(UPPDATEDUSERS))
    setTimeout(() => {
      history.goBack()
    }, 500)
  }

  const handleChange = ({ target }) => {
    if (target) {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }
// {_id: '67rdca3eeb7f6fgeed4711012', name: 'Троль', color: 'success'}
  const transformQualitysForMultiSelect = (arr) => {
    if (arr) {
      return arr.map(quality => ({
        value: quality._id,
        label: quality.name
      }))
    }
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
    api.users.getById(userId).then((data) => setData(prevData => {
      return {
        ...data,
        qualities: transformQualitysForMultiSelect(data.qualities)
      }
    }))
  }, [])

  const sex = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' }
  ]

  if (professions && qualities) {
    return (<div className='container col-md-6 offset-md-3'>
      <div className="card shadow-sm">
        <div className="card-body">
          <TextField
            type='text'
            label='Имя'
            name='name'
            onChange={handleChange}
            value={data.name}
            error={errors.name}
          />
          <TextField
            type='text'
            label='Электронная почта'
            name='email'
            onChange={handleChange}
            value={data.email}
            error={errors.email}
          />
          <SelectField
            label='Выбрать профессию'
            name='profession'
            value={data.profession.name}
            options={professions}
            onChange={handleChange}
            error={errors.profession}
          />
          <RadioField
            options={sex}
            label='Выберите ваш пол: '
            name='sex'
            value={data.sex}
            error={errors.sex}
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
          <Link
            type='button'
            className='btn btn-outline-warning me-md-2'
            to={`/users/${userId}`}
          >
            Отменить
          </Link>
          <button
            onClick={handleSubmit}
            className='btn btn-outline-warning me-md-2 ms-2'
            disabled={!isValid}
          >
            <Link
              to={`/users/${userId}/edit`}
            >
              Сохранить
            </Link>
          </button>
        </div>
      </div>
    </div>)
  } else {
    return <h3>Loading...</h3>
  }
}

export default UserEditForm
