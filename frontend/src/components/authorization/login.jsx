import { CircularProgress } from "@mui/material"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { getUser } from "../../reducers/user"
import { useDispatch } from "react-redux"

const Login = () => {
  // States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)
  const [load, setLoad] = useState(false)


  const navigate = useNavigate()
  const dispatch = useDispatch()

   // Clear Input handler
   const clearInput = () => {
    setTimeout(() => {
      setEmail("")
      setPassword("")
      setError(null)
      setMsg("")
    }, 2400);
  }
  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoad(true)
    if(!email || !password){
      setError(`Siz ${!email ? "emailni" : ""} ${!password ? "parolni" : ""} kiritmadingiz!`)
      setLoad(false)
      clearInput()
      return
    }

    const data =  {userEmail: email, userPassword: password}
    await fetch("https://one7-maktab-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      if(data.error){
        setLoad(false)
        setError(data.error)
        clearInput()
        return 
      } else{
        setLoad(false)
        if(data._id == "6780a16303e4147c822137c3"){
          setMsg("Salom Admin! Xush Kelibsiz!")
        }else{
          setMsg("Salom! Qaytganingizdan xursandman!")
        }
        clearInput()
        setTimeout(() => {
          dispatch(getUser(data))
          navigate("/")
        }, 2400);
      }
    })
  }
  return (
    <section className="flex justify-between items-center h-[80vh] md:px-10 px-2">
      <div className="md:block hidden px-32">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4aI0FLvynIZkFcY8IlrNmaPKnLOSaH2rYgw&s" alt="" />
      </div>
      <form className="md:w-1/2 w-full" onSubmit={(e) => submitHandler(e)}>
        <h1 className="font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-Title text-center mb-3">Tizimga kirish</h1>
        {error && (
            <p className="py-2 md:text-[20px] w-full text-center my-2 rounded-md text-white bg-red-700">{error}</p>
          )}
          {msg && (
            <p className="py-2 md:text-[20px] w-full text-center my-2 rounded-md text-white bg-green-700">{msg}</p>
          )}
        <div className="my-3">
          <label htmlFor="email" className="mb-2 text-gray-700 text-lg">Email</label>
          <input
            className="border px-3 py-2 focus:shadow-md placeholder:text-base border-black outline-none rounded-sm w-full focus:scale-105 ease-in-out duration-300"
            type="email"
            placeholder="Enter your email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label htmlFor="password" className="mb-2 dark:text-gray-700 text-lg">Password</label>
          <input
            className="border p-3 mb-2 focus:shadow-md placeholder:text-base border-black outline-none rounded-sm w-full focus:scale-105 ease-in-out duration-300"
            type="password"
            placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
            <button className="bg-blue-500 link select-none hover:bg-blue-600 active:bg-blue-800 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline flex justify-center items-center gap-4">Kirish {load && <CircularProgress size={"23px"} color="white"/>}</button>
      </form>
    </section>
  )
}

export default Login