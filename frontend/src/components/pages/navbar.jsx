import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {lightMode, darkModeF} from '../../reducers/mode'
import { logoutUser } from '../../reducers/user';


const Navbar = () => {
  // States
  const [userPanel, setUserPanel] = useState(false)
  const [bar, setBar] = useState(false)
  const [active, setActive] = useState("Home")
  // 
  const {user, admin} = useSelector(state => state.user)
  const {darkMode} = useSelector(state => state.mode)
  // 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Navbar links
  const links = [
    {link: "/", name: "Home"},
    {link: "/about", name: "About"},
    {link: "/contact", name: "Contact"},
    user && {link: "/our/blogs", name: "Our Blog"}
  ]

  // Hidden bar
  const responsiveLink = document.querySelectorAll(".link")
  responsiveLink.forEach(item => {
    item.addEventListener("click", () => {
       setBar(false)
    })
  })

  // Hidden user panel
  const userPanelHidden = document.querySelectorAll(".bar")
  userPanelHidden.forEach(item => {
    item.addEventListener("click", () => {
       setUserPanel(false)
    })
  })
  
  // Logout Handler 
  const logoutHandler = () => {
    dispatch(logoutUser())
    setUserPanel(false)
    setActive("Login")
    navigate("/login")
  }
  return (
    <nav className={`flex justify-between items-center py-2 border-b shadow-md md:px-4 fixed top-0 left-0 w-full duration-200 ${darkMode ? "bg-black" :"bg-white"} z-50`}>
      {/* Logo */}
      <div className="flex md:justify-center max-md:ml-2 justify-start items-center w-1/4 cursor-pointer" onClick={() => navigate("/")}> 
        <img src={darkMode ? "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1920650/1a1c612222b1f3c91615047c63a9a469847cd026.jpg" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqyCGQ6_FvcsIz_zbAeUa0LXwUTS0D90PIpw&s"} alt="logo.png" className="md:w-1/5 w-1/2"/>
        <h2 className={`font-bold text-4xl max-md:hidden ${darkMode && "text-white"}`}>-Maktab</h2>
      </div>
      {/* Links  */}
      <div className="flex items-center justify-around gap-6 max-md:hidden">
        {links.map((item, i) => (
          <p href={item.link} onClick={() => {
            setActive(item.name)
            navigate(item.link)
          }} className={`select-none text-[20px] font-semibold hover:text-blue-700 cursor-pointer duration-150 ${active === item.name ? "text-blue-700" : `${darkMode ? "text-white" : "text-black"}`}`}>{item.name}</p>
        ))}
      </div>
      {/* Responsive links */}
      <div className={`flex items-center justify-around flex-col py-5 overflow-x-hidden gap-6 w-full md:hidden bg-white absolute shadow-md ${bar ? "top-0 duration-300" : "-top-96 duration-500" } z-10`}>
      {links.map((item, i) => (
          <p href={item.link} onClick={() => {
            setActive(item.name)
            navigate(item.link)
          }} className={`select-none link text-[20px] font-semibold hover:text-blue-700 cursor-pointer duration-150 ${active === item.name ? "text-blue-700" : "text-black"}`}>{item.name}</p>
        ))}
        {!user && (
          <>
            <button onClick={() => {
              navigate("/login")
              setActive("Login")
            }} className={`bg-blue-500 link hover:bg-blue-700 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline ${active === "Login" && "bg-blue-700"}`} type="button">Login</button>
            <button onClick={() => {
              navigate("/register")
              setActive("Register")
            }} className={`bg-green-500 link hover:bg-green-700 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline ${active === "Register" && "bg-green-700"}`} type="button">Register</button>
          </>
        )}
        <i className="fa-solid fa-xmark absolute top-0 cursor-pointer right-6 text-2xl" onClick={() => setBar(prev => !prev)}></i>
      </div>
      {/* Login register Btn */}
      <div className="flex justify-around md:gap-2 gap-5 items-center">
        {/* responsive buttons */}
        <div className='md:hidden block'>
          <i className={`fa-solid fa-bars text-2xl ${darkMode ? "text-white": "text-black"}`} onClick={() => setBar(prev => !prev)}></i>
        </div>

        {user ? (
          <div onClick={() => setUserPanel(prev => !prev)}>
            <Avatar alt={user.username} sx={{height: "50px", width: "50px"}} className='border p-1 cursor-pointer' src="d"/>
          </div>
        ) : (
          <>
            <button onClick={() => {
              navigate("/login")
              setActive("Login")
            }} className={`bg-blue-500 md:block hidden hover:bg-blue-700 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline ${active === "Login" && "bg-blue-700"}`} type="button">Login</button>
            <button onClick={() => {
              navigate("/register")
              setActive("Register")
            }} className={`bg-green-500 md:block hidden hover:bg-green-700 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline ${active === "Register" && "bg-green-700"}`} type="button">Register</button>
          </>
        )}
      </div>
      {/* User card */}
        <ul className={`p-2 rounded-md border flex flex-col gap-2 duration-300 items-start absolute md:right-16 right-2 bg-white ${userPanel ? "top-16" : "sm:-top-[380%] -top-[500%]"}`}>
          <div className='border-b-2 font-semibold flex flex-col gap-1 py-2'>
            <li>{user.username} ({user.userClass})</li>
            <li>{user.userEmail}</li>
          </div>
          {admin ? (
            <li className='hover:bg-gray-100 bar cursor-pointer w-full select-none p-1' onClick={() => navigate("/my/admin/panel/0811")}>Dashboard</li>
          ) : (
            <li className='hover:bg-gray-100 bar cursor-pointer w-full select-none p-1' onClick={() => navigate("/profil")}>Profil</li>
          )}
          <li className='hover:bg-gray-100 bar cursor-pointer select-none p-1'>
            {darkMode ? (
              <img src="https://cdn.creazilla.com/cliparts/75176/sun-icon-clipart-xl.png" alt="sun" className='w-8' onClick={() => dispatch(lightMode())}/>
            ) : (
              <img src="https://static.vecteezy.com/system/resources/previews/016/774/615/non_2x/moon-icon-on-transparent-background-free-png.png" alt="sun" className='w-8' onClick={() => dispatch(darkModeF())}/>
            )}
          </li>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={logoutHandler}>Logout</button>
        </ul>
    </nav>
  )
}

export default Navbar