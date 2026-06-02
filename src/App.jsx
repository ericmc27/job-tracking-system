import { useState } from "react"

function App() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  console.log(loginData)
  const [showLogin, setShowLogin] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.currentTarget
    setLoginData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFormSubmit = (e) => {
  }

  return (
    <div className='min-h-screen'>
      <header>
        <nav className="flex ">
          <button onClick={() => setShowLogin(true)} className="hover:cursor-pointer">Sign in</button>
        </nav>
      </header>

      <main>
        {
          showLogin &&
          <div onClick={() => setShowLogin(false)} className="fixed bg-black/50 inset-0 flex items-center justify-center" >
            <form onSubmit={handleFormSubmit} onClick={(e) => e.stopPropagation()} className="flex flex-col items-center justify-center border h-100 w-100 bg-white">
              <label htmlFor="email">EMAIL</label>
              <input id="email" type="email" className="border w-55" onChange={(e) => handleInputChange(e)} value={loginData.email} />
              <label htmlFor="password">PASSWORD</label>
              <input id="password" type="password" className="border w-55" onChange={(e) => handleInputChange(e)} value={loginData.password} />
              <button type="submit" className="border w-55">LOGIN</button>
            </form>
          </div>
        }
      </main>

      <footer></footer>
    </div>
  )
}

export default App