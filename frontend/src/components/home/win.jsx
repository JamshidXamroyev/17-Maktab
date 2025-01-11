import { useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

const Win = () => {
    const navigate = useNavigate()
    const {darkMode} = useSelector(state => state.mode)
    const {user} = useSelector(state => state.user)

    return (
        <section className={`py-4 ${darkMode ? "bg-black border-b border-white" : "bg-white"}`}>
            <h1 className={`font-Title lg:text-5xl md:text-4xl text-3xl md:my-9 text-center font-bold ${darkMode ? "text-white": "text-black"} lg:py-8 duration-200`}>Bizning Yutuqlarimiz!</h1>
            <div className={`overflow-x-hidden lg:mx-16 md:mx-8 mx-2 `}>
                <div id="inner" className="grid lg:grid-cols-4 py-10 duration-500 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-7">
                {/* Map qilinadigan div */}
                <div className={`border newCard ${darkMode ? "bg-white" : ""}`}>
                    <div className="w-full h-1/2 border-b">
                        <LazyLoadImage
                            alt="Beautiful view"
                            style={{height: "40vh"}}
                            height="auto"
                            effect="blur"  // Bu parametr rasm yuklanayotganda uni mushtlash effektida ko'rsatadi
                            src="https://nmedov.uz/wp-content/uploads/2022/03/progress-01.jpg" // Rasm manzili
                            width="100%"
                        /> 
                    </div>
                    <div className="p-2">
                        <h2 className="text-[23px] font-semibold">Zamonaviy Sinfxona</h2>
                        <p className="text-justify py-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente deleniti nulla animi odit dolorem veniam, corrupti ducimus iste perferendis praesentium necessitatibus soluta ab porro, atque delectus vero tenetur repudiandae commodi. lorem</p>
                        <footer className="flex justify-between items-center border-t pt-2">
                            <span className="opacity-55 lg:text-[20px]">18-dec</span>
                            <button className="w-1/3 border md:py-2 py-1 rounded-md hover:text-white border-black hover:bg-black font-semibold duration-500 ease-in-out" onClick={() => navigate("/about")}>Ko'rish</button>
                        </footer>
                    </div>
                </div>
            </div>
            </div>
        </section>
      )
  }

export default Win