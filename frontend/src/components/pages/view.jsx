import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";


const View = () => {
    const {id} = useParams()
    const {darkMode} = useSelector(state => state.mode)
    const {user} = useSelector(state => state.user)
    const [load, setLoad] = useState(false)
    const [item, setItem] = useState()
    const navigate = useNavigate()

    
    useEffect(() => {
        const getBlog = async() => {
            setLoad(true)
            await fetch(`https://one7-maktab-backend.onrender.com/get-one/${id}`).then(res => res.json()).then(data => setItem(data))
            setLoad(false)
        }
        getBlog()
    }, [])

  return (
    <section className="py-20">
        {load ? <div className="h-[100vh] flex justify-center items-center"><CircularProgress /></div> : (
          <>
              <h1 className={`font-Title lg:text-5xl md:text-4xl py-5 text-3xl text-center font-bold ${darkMode ? "text-white": "text-black"} duration-200`}>Bizning Blogimiz</h1>
              <div className={`overflow-x-hidden lg:mx-4 mx-2 `}>
                <div id="inner" className="grid lg:grid-cols-2 overflow-y-hidden duration-500 items-start gap-7">
                    {item && (
                        <>
                          <div className="w-full h-1/2">
                            <div className="w-full">
                              <LazyLoadImage
                                  alt="Beautiful view"
                                  effect="blur"  // Bu parametr rasm yuklanayotganda uni mushtlash effektida ko'rsatadi
                                  src={item.blogImg} // Rasm manzili
                                  width="100%"
                              /> 
                            </div>
                          </div>
                            <div className="py-5">
                                <h2 className="text-[23px] font-semibold">{item.blogTitle}</h2>
                                <p className="text-justify py-1">{item.blogDescription}</p>
                                <footer className="flex justify-between items-center border-t pt-2">
                                    <span className="opacity-55">{moment(item.createdAt).format("DD-MMMM")}</span>                            
                                    <button className="w-1/3 border md:py-2 py-1 rounded-md hover:text-white border-black hover:bg-black font-semibold duration-500 ease-in-out" onClick={() => navigate("/")}>Qaytish</button>
                                </footer>
                            </div>
                        </>
                    )}
              </div>
              </div>
          </>
        )}
    </section>
  )
}

export default View