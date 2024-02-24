import React, { useState, useEffect, useRef } from 'react'

import { TEXTS } from './Register.text'
import { USER_REGEX, PWD_REGEX } from '../../utils/Utils'
import ValidationMessage from '../../utils/InputHelpers'
import {
  SuccessIcon,
  ErrorIcon,
} from '../../utils/InputHelpers/ValidationIcons'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

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
  const [success, setSuccess] = useState(false)

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
      returnNufc
    }
    console.log(username, pwd)
    setSuccess(true)
  }

  return (
    <section className='w-[100%] max-w-[420px] min-h-[400px] flex flex-col justify-start p-1 bg-white shadow-bshadow2 px-10 py-12 rounded-3xl'>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>

      <h2 className='text-3xl font-semibold'>{TEXTS.title}</h2>
      <p className='font-medium text-sm text-gray-400 mt-2'>{TEXTS.subtitle}</p>
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
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            ref={userRef}
            autoComplete='off'
            required
            placeholder={TEXTS.placeholder}
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
            htmlFor={TEXTS.fields.password.name}
            className='text-md font-normal'
          >
            {TEXTS.fields.password.label}
          </label>
          <input
            type='password'
            id={TEXTS.fields.password.name}
            name={TEXTS.fields.password.name}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            required
            placeholder={TEXTS.fields.password.placeholder}
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
            text={TEXTS.fields.password.note}
          />
        </div>

        <div className='relative mb-3'>
          <label
            htmlFor={TEXTS.fields.confirmPassword.name}
            className='text-md font-normal'
          >
            {TEXTS.fields.confirmPassword.label}
          </label>
          <input
            type='password'
            id={TEXTS.fields.confirmPassword.name}
            name={TEXTS.fields.confirmPassword.name}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
            required
            placeholder={TEXTS.fields.confirmPassword.placeholder}
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
            text={TEXTS.fields.confirmPassword.note}
          />
        </div>

        <button
          className='btn btn-lg btn-accent'
          disabled={!validName || !validPwd || !validMatch}
        >
          Sign Up
        </button>
      </form>
      <p className='text-xs mt-6'>
        {TEXTS.registered}
        <br />
        <a href='#'>{TEXTS.signIn}</a>
      </p>
    </section>
  )
}

export default Register
