import { useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import moment from 'moment'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [load, setLoad] = useState(false)

  const {darkMode} = useSelector(state => state.mode)
  const {user} = useSelector(state => state.user)
  const navigate = useNavigate()

  const getBlogs = async () => {
    setLoad(true)
    await fetch('https://one7-maktab-backend.onrender.com/my/get-blog').then(res => res.json()).then(data => setBlogs(data))
    setLoad(false)
  }

  const DeleteBlog = async(id) => {
    setLoad(true)
    await fetch(`https://one7-maktab-backend.onrender.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setLoad(false)
  }
  
  useEffect(() => {
    getBlogs()
  }, [])
  return (
    <section className={`pt-16 pb-8 ${darkMode ? "bg-black border-b border-white" : "bg-white"}`}>
        {load ? <div className="h-[100vh] flex justify-center items-center"><CircularProgress /></div> : (
          <>
              <h1 className={`font-Title lg:text-5xl md:text-4xl text-3xl pl:my-9 my-5 text-center font-bold ${darkMode ? "text-white": "text-black"} md:py-8 duration-200`}>Bizning Blogimiz</h1>
              <div className={`overflow-x-hidden lg:mx-4 mx-2 `}>
                  <div id="inner" className="grid lg:grid-cols-4 py-10 duration-500 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-7">
                  {/* Map qilinadigan div */}
                  {blogs && blogs.slice(0,4).map(item => (
                    <div key={item._id} className={`border newCard ${darkMode ? "bg-white" : ""} h-[500px]`}>
                      <div className="border-b">
                        <LazyLoadImage
                          alt="Beautiful view"
                          style={{height: "250px"}}
                          effect="blur"  // Bu parametr rasm yuklanayotganda uni mushtlash effektida ko'rsatadi
                          src={item.blogImg} // Rasm manzili
                          width="100%"
                        /> 
                      </div>
                      <div className="p-2 h-1/2">
                          <h2 className="text-[23px] font-semibold">{item.blogTitle.slice(0, 30)}</h2>
                          <p className="text-justify py-1">{item.blogDescription.slice(0, 230)}...</p>
                          <footer className="flex justify-between items-center border-t pt-1 pb-2">
                              <span className="opacity-55">{moment(item.createdAt).format("DD-MMMM")}</span>
                              {item.blogOwner == user._id ? (
                                <div className="flex justify-between items-center w-[70%]">
                                  <button className="w-1/2 px-1 border md:py-2 py-1 rounded-sm hover:text-white border-red-700 hover:bg-red-700 font-semibold duration-300 ease-in-out" onClick={() => DeleteBlog(item._id)}>O'chirish</button>
                                  <button className="w-1/2 px-1 border md:py-2 py-1 rounded-sm hover:text-white border-green-700 hover:bg-green-700 font-semibold duration-300 ease-in-out" onClick={() => navigate(`/edit-blog/${item._id}`)}>Tahrirlash</button>
                                </div>
                                ) : (
                                  <button className="w-1/3 border md:py-2 py-1 rounded-md hover:text-white border-black hover:bg-black font-semibold duration-500 ease-in-out" onClick={() => navigate(`/view/${item._id}`)}>Ko'rish</button>
                                )}
                          </footer>
                      </div>
                  </div>
                  ))}
              </div>
              </div>
          </>
        )}
    </section>
  )
}

export default Blogs

