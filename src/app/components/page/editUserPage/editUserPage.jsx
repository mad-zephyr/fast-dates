import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities'
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions'

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [data, setData] = useState({
    name: '',
    email: '',
    professions: '',
    sex: '',
    qualities: []
  })
  const [isLoading, setLoading] = useState(false)

  const { currentUser, updateUser } = useAuth()
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }
    const updatedUser = {
      ...data,
      qualities: data.qualities.map(quality => quality.value)
    }
    try {
      await updateUser(updatedUser)
      history.push(`/users/${userId}/edit`)
    } catch (error) {
      console.log(error)
    }
  }

  const transformQuality = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }))
  }

  useEffect(() => {
    setLoading(true)
    const qual = qualities.filter(qual => currentUser.qualities?.includes(qual._id))
    setData(prevState => ({
      ...currentUser,
      qualities: transformQuality(qual),
      profession: currentUser.profession
    }))
  }, [qualitiesLoading])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    }
  }
  useEffect(() => validate(), [data])

  const handleChange = target => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
        {isLoading && !qualitiesLoading && !professionsLoading
          ? <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                name="profession"
                options={professions}
                defaultOption="Choose..."
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label="Выберите ваш пол"
                name="sex"
                value={data.sex}
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                onChange={handleChange}
              />
              <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                defaultValue={data.qualities}
                options={transformQuality(qualities)}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          : ('Loading...')
        }
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
