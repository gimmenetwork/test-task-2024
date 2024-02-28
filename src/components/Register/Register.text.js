export const TEXTS = {
  title: 'Register',
  subtitle: 'Please enter your details',
  fields: {
    username: {
      name: 'username',
      label: 'Username',
      placeholder: 'Enter Username',
      note: (
        <>
          4 to 24 characters.
          <br />
          Must Begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </>
      ),
    },
    pwd: {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      note: (
        <>
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{' '}
          <span aria-label='exclamation mark'>!</span>{' '}
          <span aria-label='at symbol'>@</span>{' '}
          <span aria-label='hashtag'>#</span>{' '}
          <span aria-label='dollar sign'>$</span>{' '}
          <span aria-label='percent'>%</span>{' '}
        </>
      ),
    },
    confirmPwd: {
      name: 'confirm_password',
      label: 'Confirm Password',
      placeholder: 'Enter Password to confirm',
      note: 'Must match the password input field.',
    },
  },
  btnText: 'Sign Up',
  login: {
    text: 'Already registered?',
    cta: 'Sign In',
  },
}
