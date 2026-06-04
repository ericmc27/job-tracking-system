import { useState } from "react"
import { useForm } from "react-hook-form"
import { signIn } from "../../lib/auth-client.js"
import { Pulsar } from 'ldrs/react'
import 'ldrs/react/Pulsar.css'

function Home() {
  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors, isSubmitting } } = useForm()
  const [showLogin, setShowLogin] = useState(false)

  const handleCloseLogin = () => {
    setShowLogin(false)
    reset()
  }

  const onSubmit = async (data) => {
    const { email, password } = data

    //
    const res = await signIn.email({ email, password },
      {
        onSuccess: (ctx) => {
          window.location.href = "/dashboard"
        },

        onError: (ctx) => {
          setError("loginError", {
            type: "manual",
            message: "Invalid email or password"
          })

          setTimeout(()=>{
            clearErrors("loginError")
          }, 3000)
        }
      })

      //
  }

  return (
    <div className='min-h-screen bg-[#F9F8F5]'>
      <header className="">
        <nav className="flex items-center border-b border-[#DFDBD3] h-15">
          <h1 className="ms-30">ApplyWise</h1>

          <div className="right-30 absolute">
            <button onClick={() => setShowLogin(true)} className="hover:cursor-pointer hover:text-orange-500 me-7">Sign in</button>
            <button className="bg-orange-500 text-white rounded p-2.5 hover:cursor-pointer">Get Started <span className="">&rarr;</span></button>
          </div>
        </nav>

      </header>

      <main>
        {
          showLogin &&
          <div onClick={handleCloseLogin} className="fixed bg-black/50 inset-0 flex items-center justify-center" >
            <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-center justify-center gap-3.5 rounded h-110 w-100 bg-white">
              <label htmlFor="email">EMAIL</label>
              <input id="email" type="email" className={`${errors.loginError && "border-red-500"} h-7.5 border outline-orange-500 rounded w-55`} {...register("email", {required: true})} />
              <label htmlFor="password">PASSWORD</label>
              <input id="password" type="password" className={`${errors.loginError && "border-red-500"} h-7.5 border outline-orange-500 rounded w-55`} {...register("password", {required: true})} />
              <button type="submit" className="border rounded h-9 w-55 bg-orange-500 text-white mt-6.5 hover:cursor-pointer">LOGIN</button>
              { isSubmitting && <div className="absolute top-12.5"><Pulsar size="40" speed="1.75" color="#f97316"/></div>}
            </form>
          </div>
        }
      </main>

      <footer></footer>
    </div>
  )
}

export default Home