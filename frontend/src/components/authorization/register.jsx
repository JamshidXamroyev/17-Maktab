import { CircularProgress } from "@mui/material"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import { getUser } from "../../reducers/user"
import { useNavigate } from "react-router-dom"

const Register = () => {
  // States
  const [name, setName] = useState("")
  const [userClass, setUserClass] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(null)
  const [load, setLoad] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Clear Input handler
  const clearInput = () => {
    setTimeout(() => {
      setEmail("")
      setPassword("")
      setName("")
      setUserClass("")
      setMsg("")
      setError(null)
    }, 2400);
  }
  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoad(true)
    if(!name || !userClass || !email || !password){
      setError(`Siz ${!name ? "ismni" : ""} ${!email ? "emailni" : ""} ${!userClass ? "sinfni" : ""} ${!password ? "parolni" : ""} kiritmadingiz!`)
      setLoad(false)
      clearInput()
      return 
    }

    await fetch('https://one7-maktab-backend.onrender.com/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: name, userClass, userEmail: email, userPassword: password})
    }).then(res => res.json()).then(data => {
      if(data.error){
        setError(data.error)
        return 
      } else{
        setMsg("Tabriklaymiz! Siz muvofaqiyatli ro'yxatdan o'tdingiz!")
        setTimeout(() => {
          dispatch(getUser(data))
          navigate("/")
        }, 2400);
      }
    }).catch(err => console.log(err))
    setLoad(false)
    clearInput()
  }
  return (
    <section className="md:px-10 px-3 h-[80vh] flex items-center justify-between pt-8">
      <div className="md:block hidden">
        <img src="https://classroomclipart.com/image/cal/school-checklist-with-as-a-pencil-magnifying-glass-and-books.webp" alt="school resgiter" />
      </div>
      <form className="md:w-1/2 w-full my-4" onSubmit={(e) => submitHandler(e)}>
      <h1 className="font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-Title text-center mb-3">Royxatdan o'tish</h1>
      {error && (
        <p className="py-2 md:text-[20px] w-full text-center my-2 rounded-md text-white bg-red-700">{error}</p>
      )}
      {msg && (
        <p className="py-2 md:text-[20px] w-full text-center my-2 rounded-md text-white bg-green-700">{msg}</p>
      )}
        <header className="flex justify-center items-center gap-6 w-full">
          <div className="flex items-start flex-col justify-start w-1/2">
            <label className="text-lg text-gray-700 mr-2">Your name:</label>
            <input type="text" placeholder="Ismingizni kiriting"  value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-2 focus:shadow-md placeholder:text-base border-black outline-none rounded-sm focus:scale-105 ease-in-out duration-300" />
          </div>
          <div className="w-1/2">
              <label className="text-lg text-gray-700 mr-2 mb-2">Tanlang</label>
              <select class="block w-full text-sm font-medium outline-none transition duration-75 border border-gray-800 shadow-sm h-10 px-2 bg-none" onChange={(e) => setUserClass(e.target.value)}>
                <option value="">Sinfingizni tanlang</option>
                <option value="6-sinf">6-sinf</option>
                <option value="7-sinf">7-sinf</option>
                <option value="8-sinf">8-sinf</option>
                <option value="9-sinf">9-sinf</option>
                <option value="10-sinf">10-sinf</option>
                <option value="11-sinf">11-sinf</option>
                <option value="user">Kuzatuvchi</option>
                <option value="ustoz">O'qituvchi</option>
              </select>
          </div>
        </header>
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
            <button className="bg-green-500 link hover:bg-green-600 select-none active:bg-green-800 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline flex justify-center items-center gap-5">Ro'yxatdan o'tish {load && <CircularProgress size={"23px"} color="white"/>}</button>
      </form>
    </section>
  )
}

export default Register