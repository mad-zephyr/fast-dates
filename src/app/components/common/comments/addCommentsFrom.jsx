import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { validator } from '../../../utils/validator'
import validatorConfig from '../../../utils/validatorConfig'

import SelectField from '../form/selectField'
import { TextArea } from '../form'
import API from '../../../api/index'

const AddCommentForm = ({ userId, onChange }) => {
  const [optionsName, setOptionsName] = useState([])
  const [errors, setErrors] = useState('')
  const [isSubmited, setSubmited] = useState(false)

  const [dataComment, setDataComment] = useState(
    {
      pageId: userId,
      content: '',
      userId: ''
    }
  )

  const validate = () => {
    const errors = validator(dataComment, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [dataComment])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    API.comments.add(dataComment)

    setDataComment((prevComment) => {
      return {
        ...prevComment,
        content: '',
        userId: ''
      }
    })

    setSubmited(prevState => !prevState)
    setErrors('')
    onChange()
  }

  useEffect(() => {
    API.users.fetchAll().then(data => {
      const names = data.map(data => {
        return {
          _id: data._id,
          name: data.name
        }
      })
      setOptionsName(names)
    })
  }, [])

  const handleChange = (e) => {
    const id = e.target.selectedOptions[0].dataset.id
    setDataComment((prevState) => {
      return {
        ...prevState,
        userId: id
      }
    })
  }

  const handleSetCommentText = (e) => {
    const commentText = e.target.value
    setDataComment((prevState) => {
      return {
        ...prevState,
        content: commentText
      }
    })
  }

  return (
    <div className="card mb-3">
      <div className="card-body">

        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <SelectField
              label={'Комментатор'}
              name='userId'
              value={dataComment.userId}
              options={optionsName}
              onChange={handleChange}
              onSubmit={isSubmited}
              defaultOption={'Выберите пользователя'}
              error={errors.userId}
            />
          </div>
          <div className="mb-4">
            <TextArea
              label='Сообщение'
              name={'content'}
              value={dataComment.content}
              onChange={handleSetCommentText}
              rows={3}
              onSubmit={isSubmited}
              error={errors.content}
            />
            <div className='d-flex flex-row-reverse'>
              <button
                className='btn btn-primary'
                onClick={handleSubmit}
                disabled={!isValid}
              > Опубликовать </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AddCommentForm.propTypes = {
  userId: PropTypes.string,
  onChange: PropTypes.func
}

export default AddCommentForm
