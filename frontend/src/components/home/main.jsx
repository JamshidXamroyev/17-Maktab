import { lazy } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
const News = lazy(() => import("./news"))
const Win = lazy(() => import("./win"))

const Main = () => {
  const navigate = useNavigate()
  const {user} = useSelector(state => state.user)

  return (
    <>
      <main className="w-full relative md:h-[90vh] h-[80vh] flex justify-center items-center mt-[10vh]">
          <div className="absolute top-0 -z-10 md:h-[100vh] max-md:h-[69vh]">
            <LazyLoadImage
              alt="Beautiful view"
              style={{height: "100vh"}}
              effect="blur"  // Bu parametr rasm yuklanayotganda uni mushtlash effektida ko'rsatadi
              src="https://as2.ftcdn.net/v2/jpg/02/43/22/71/1000_F_243227135_0MKgZJefxBmaClJmhFdgfSByHI4n8UVy.jpg" // Rasm manzili
              width="100%"
            /> 
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold lg:text-6xl md:text-5xl text-3xl text-center text-white">Maktabimiz saytiga <br />Xush Kelibsiz</h2>
            <div className="my-7 flex justify-between gap-6">
              {!user && <button className="lg:px-20 md:px-16 px-10 border md:py-2 py-1 rounded-md text-[22px] text-white hover:bg-white hover:text-black font-semibold duration-500 ease-in-out" onClick={() => navigate("/login")}>Kirish</button>}
              <button className="lg:px-20 md:px-16 px-10 border md:py-2 py-1 w-full rounded-md text-[22px] text-white hover:bg-white hover:text-black font-semibold duration-500 ease-in-out" onClick={() => navigate("/about")}>Biz haqimizda</button>
            </div>
          </div>
        </main>

        {/* // Yutuqlarimiz */}
        <Win />
        {/* // Yangiliklar == e'lonlar  */}
        {user && <News />}
    </>
  )
}

export default Main