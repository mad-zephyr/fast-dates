import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
  const { type } = useParams()

  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const toggleForm = () => {
    setFormType(prevFormType => (
      prevFormType === 'register' ? 'login' : 'register'
    ))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'login'
            ? <>
                <LoginForm />
                <p style={{ textAlign: 'center' }}> All ready registered
                  <Link to='/login/register'
                    onClick={toggleForm}>
                    Sign up
                  </Link>
                </p>
              </>
            : <>
                <RegisterForm />
                <p style={{ textAlign: 'center' }}> Dont have account?
                  <Link to='/login'
                    onClick={toggleForm}>{' '}
                    Sign in
                  </Link>
                </p>
              </>
            }

        </div>
      </div>
    </div>
  )
}

export default Login
