import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import AuthPageLayout from '../Layout/AuthPageLayout'
import { TEXTS } from './Register.text'
import { USER_REGEX, PWD_REGEX } from '../../utils/Utils'
import ValidationMessage from '../../utils/InputHelpers/ValidationMessage'
import {
  SuccessIcon,
  ErrorIcon,
} from '../../utils/InputHelpers/ValidationIcons'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [username, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!USER_REGEX.test(username) || !PWD_REGEX.test(pwd)) {
      setErrMsg('Invalid Entry')
      return
    }
    let formData = { username, pwd }

    axios
      .post(`${process.env.REACT_APP_JSON_SERVER_URL}/user`, formData)
      .then((res) => {
        console.log('Register success')
        navigate('/login')
      })
      .catch((err) => {
        setErrMsg(`Server Error: ${err.message}`)
      })
  }

  return (
    <AuthPageLayout>
      <section
        id='register'
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
              aria-invalid={validName}
              aria-describedby='uid-note'
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {validName && <SuccessIcon />}
            {validName || !username ? null : <ErrorIcon />}
            <ValidationMessage
              isShown={userFocus && username && !validName}
              id='uid-note'
              text={TEXTS.fields.username.note}
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
              aria-invalid={validPwd}
              aria-describedby='pwd-note'
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {validPwd && <SuccessIcon />}
            {validPwd || !pwd ? null : <ErrorIcon />}
            <ValidationMessage
              isShown={pwdFocus && !validPwd}
              id='pwd-note'
              text={TEXTS.fields.pwd.note}
            />
          </div>

          <div className='relative mb-6'>
            <label
              htmlFor={TEXTS.fields.confirmPwd.name}
              className='text-md font-normal'
            >
              {TEXTS.fields.confirmPwd.label}
            </label>
            <input
              type='password'
              id={TEXTS.fields.confirmPwd.name}
              name={TEXTS.fields.confirmPwd.name}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent placeholder:italic placeholder:text-xs'
              required
              placeholder={TEXTS.fields.confirmPwd.placeholder}
              aria-invalid={validMatch}
              aria-describedby='confirm-note'
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            {validMatch && matchPwd && <SuccessIcon />}
            {validMatch || !matchPwd ? null : <ErrorIcon />}
            <ValidationMessage
              isShown={matchFocus && !validMatch}
              id='confirm-note'
              text={TEXTS.fields.confirmPwd.note}
            />
          </div>

          <button
            className='btn btn-lg btn-accent'
            disabled={!validName || !validPwd || !validMatch}
          >
            {TEXTS.btnText}
          </button>
        </form>

        <div className='text-xs mt-6 flex justify-center items-center'>
          <p>{TEXTS.login.text}</p>
          <Link to='/login' className='text-accent ml-1'>
            {TEXTS.login.cta}
          </Link>
        </div>
      </section>
    </AuthPageLayout>
  )
}

export default Register
