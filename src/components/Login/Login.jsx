import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import AuthPageLayout from '../Layout/AuthPageLayout'
import { TEXTS } from './Login.text'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')

  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username === '' || username === null) {
      setErrMsg(TEXTS.fields.username.errors.required)
    }
    if (pwd === '' || pwd === null) {
      setErrMsg(TEXTS.fields.pwd.errors.required)
    }

    let formData = { username, pwd }

    axios
      .get(`${process.env.REACT_APP_JSON_SERVER_URL}/user`)
      .then((res) => {
        res.data.map((user) => {
          if (user.username === formData.username) {
            if (user.pwd === formData.pwd) {
              // success
              console.log('Login successful')
              navigate('/')
            } else {
              setErrMsg(TEXTS.fields.pwd.errors.incorrect)
            }
          }
        })
      })
      .catch((err) => {
        setErrMsg(`Server Error: ${err.message}`)
      })
  }

  return (
    <AuthPageLayout>
      <section
        id='login'
        className='relative w-[100%] max-w-[420px] min-h-[400px] flex flex-col justify-start bg-white shadow-bshadow2 px-10 py-12 rounded-3xl'
      >
        <p
          ref={errRef}
          className={`absolute w-[100%] max-w-[340px] bg-error px-4 py-2 text-white rounded-2xl -top-14 ${
            errMsg ? 'flex' : 'hidden'
          }`}
          aria-live='assertive'
        >
          {errMsg}
        </p>

        <h2 className='text-3xl font-semibold'>{TEXTS.title}</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-evenly flex-1 pb-1 mt-4'
        >
          <div className='relative mb-3'>
            <label
              htmlFor={TEXTS.fields.username.name}
              className='text-md font-normal'
            >
              {TEXTS.fields.username.label}
            </label>
            <input
              type='text'
              id={TEXTS.fields.username.name}
              name={TEXTS.fields.username.name}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent placeholder:italic placeholder:text-xs'
              ref={userRef}
              autoComplete='off'
              required
              placeholder={TEXTS.fields.username.placeholder}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className='relative mb-3'>
            <label
              htmlFor={TEXTS.fields.pwd.name}
              className='text-md font-normal'
            >
              {TEXTS.fields.pwd.label}
            </label>
            <input
              type='password'
              id={TEXTS.fields.pwd.name}
              name={TEXTS.fields.pwd.name}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent placeholder:italic placeholder:text-xs'
              required
              placeholder={TEXTS.fields.pwd.placeholder}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
          </div>

          <div className='mb-4 flex justify-between items-center'>
            <div className=''>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember' className='ml-2 font-light text-sm'>
                Remember me
              </label>
            </div>
          </div>

          <button
            className='btn btn-lg btn-accent'
            disabled={username === '' || pwd === ''}
          >
            {TEXTS.btnText}
          </button>
        </form>

        <div className='text-xs mt-6 flex justify-center items-center'>
          <p>{TEXTS.register.text}</p>
          <Link to='/register' className='text-accent ml-1'>
            {TEXTS.register.cta}
          </Link>
        </div>
      </section>
    </AuthPageLayout>
  )
}

export default Login
