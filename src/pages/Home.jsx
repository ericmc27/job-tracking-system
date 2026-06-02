import { useState } from "react"
import { signIn } from "../../lib/auth-client.js"

function Home() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [showLogin, setShowLogin] = useState(false)

  const handleCloseLogin = () => {
    setShowLogin(false)
    setLoginData(() => ({ email: '', password: '' }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = loginData
    const res = await signIn.email({ email, password },
      {
        onSuccess: (ctx) => {
          window.location.href = "/dashboard"
        },

        onError: (ctx) => {
          alert("An error")
        }
      })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.currentTarget
    setLoginData((prev) => ({ ...prev, [id]: value }))
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
          <div onClick={handleCloseLogin} className="fixed bg-black/50 inset-0 flex items-center justify-center" >
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

export default Home