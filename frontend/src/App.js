import React, {Suspense} from 'react';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Profil from './components/pages/profil';
import Edit from './components/pages/edit';
import View from './components/pages/view';

// Lazy loading component
const Main = React.lazy(() => import("./components/home/main"))
const Navbar = React.lazy(() => import("./components/pages/navbar"))
const Footer = React.lazy(() => import("./components/pages/footer"))
const About = React.lazy(() => import("./components/pages/about"))
const Contact = React.lazy(() => import("./components/pages/contact"))
const Login = React.lazy(() => import("./components/authorization/login"))
const Register = React.lazy(() => import("./components/authorization/register"))
const NotPage = React.lazy(() => import("./components/pages/notFound"))
const Blogs = React.lazy(() => import("./components/pages/blogs"))
const AdminPanel = React.lazy(() => import("./components/adminPanel/admin.main"))


const App = () => {
  const {user, admin} = useSelector(state => state.user)
  return (
    <Suspense fallback={<div className='h-[100vh] w-[100vw] flex justify-center items-center'><CircularProgress /></div>}>
         <div className='overflow-x-hidden'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            {!user ? (
              <>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
              </>
            ) : (
              <>
                <Route path='/our/blogs' element={<Blogs />}/> 
                <Route path='/view/:id' element={<View />}/> 
                <Route path='/profil' element={<Profil />}/> 
              </>
            )}
            {admin && (
              <>
                <Route path='/my/admin/panel/0811' element={<AdminPanel />}/>
                <Route path='/edit-blog/:id' element={<Edit />}/>
              </>
            )}
            <Route path='*' element={<NotPage />}/>
          </Routes>
        </div>
        <Footer /> 
       </Suspense>
  )
}

export default App