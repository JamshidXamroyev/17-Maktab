import { useState } from "react"
import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {aboutImg} from "../../assets/data/index"
import 'react-lazy-load-image-component/src/effects/blur.css'

const About = () => {
  const [about, setAbout] = useState(false)
  const {darkMode} = useSelector(state => state.mode)

  return (
    <section className={`pb-8 pt-[18vh] px-4 ${darkMode ? "bg-black border-b" : "bg-white"}`}>
      <h1 className={`text-center mt-5 mb-12 font-bold lg:text-5xl md:text-4xl text-3xl font-Title ${darkMode ? "text-white" : ""}`}>Biz haqimizda</h1>
      <div className="flex justify-between items-start md:flex-row flex-col gap-7">
        {/* About Info */}
        <div className="md:w-1/2 w-full">
          <h1 className={`lg:text-3xl text-2xl font-semibold mb-3 ${darkMode ? "text-white" : ""}`}>Biz <span className="text-red-700 font-bold">17</span>-maktab jamoasimiz!</h1>
          <p className={`text-justify mb-7 leading-6 ${darkMode ? "text-white" : ""}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum, iusto praesentium possimus esse officia quaerat molestias necessitatibus nulla sed tempore sit autem dignissimos dolores recusandae, temporibus numquam modi quos distinctio ipsam adipisci aliquam. Cum magnam cumque expedita error sapiente repellat libero eius obcaecati similique. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere quaerat veniam soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. {about && "Consectetur laborum voluptate unde eaque atque saepe est perferendis neque eos odio sunt a, alias incidunt dolores voluptates magni iure? Hic reiciendis quae distinctio doloribus repudiandae nesciunt ea eius ipsum quibusdam corrupti quisquam, vel quas a rerum sapiente necessitatibus. Consequatur, alias laudantium modi excepturi voluptates ad ea aperiam? Dicta illum deleniti asperiores autem. Saepe dolore ducimus cumque dolorum animi!"}</p>
          <div className="flex justify-between items-center md:flex-row flex-col my-9 w-full gap-2">
            <div className="flex flex-col justify-center items-center border px-2 py-1 gap-3 w-full max-md:my-2">
              <h1 className="font-bold lg:text-[26px] md:text-[20px] text-[25px] style-gr">100+</h1>
              <p className={`${darkMode ? "text-white" : ""}`}>Barcha o'qituvchilar</p>
            </div>

            <div className="flex flex-col justify-center items-center border px-2 py-1 gap-3 w-full max-md:my-2">
              <h1 className="font-bold lg:text-[26px] md:text-[20px] text-[25px] style-gr">65+</h1>
              <p className={`text-center md:text-base ${darkMode ? "text-white" : ""}`}>Oliy toifali o'qituvchilar</p>
            </div>

            <div className="flex flex-col justify-center items-center border px-2 py-1 gap-3 w-full max-md:my-2">
              <h1 className="font-bold lg:text-[26px] md:text-[20px] text-[25px] style-gr">860+</h1>
              <p className={`${darkMode ? "text-white" : ""}`}>Barcha o'quvchilar</p>
            </div>
          </div>
          <button onClick={() => setAbout(prev => !prev)} className={`w-full border-black border py-2 rounded-sm text-[22px] ${darkMode ? "hover:bg-white hover:text-black text-white border-white" : "hover:bg-black hover:text-white text-black "} font-semibold duration-500 ease-in-out`}>{about ? "Kamroq" :"Ko'proq"}</button>
        </div>
        {/* About Image */}
        <div className="md:w-1/2 w-full">
            <LazyLoadImage
              alt="Beautiful view"
              height="auto"
              effect="blur"  // Bu parametr rasm yuklanayotganda uni mushtlash effektida ko'rsatadi
              src={aboutImg} // Rasm manzili
              width="100%"
            /> 
        </div>
      </div>
    </section>
  )
}

export default About