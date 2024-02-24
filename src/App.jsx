import Register from './components/Register'
import SignIn from './components/SignIn'

function App() {
  return (
    <main className='App'>
      <div className='flex w-full h-screen'>
        <div className='hidden lg:flex items-center justify-center lg:w-1/2 h-full bg-grey'>
          <div className='w-60 h-60 bg-accent'></div>
        </div>
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <Register />
        </div>
        {/* <SignIn /> */}
      </div>
    </main>
  )
}

export default App
