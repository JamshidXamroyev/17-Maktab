import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {
    const [img, setImg] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(null)

    const {id} = useParams()
    const {darkMode} = useSelector(state => state.mode)
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate()

    const getBlog = async() => {
        setLoad(true)
        await fetch(`https://one7-maktab-backend.onrender.com/get-one/${id}`).then(res => res.json()).then(data => {
            setImg(data.blogImg) 
            setTitle(data.blogTitle)
            setDescription(data.blogDescription)
            setLoad(false)
        })
    } 

    useEffect(() => {
        getBlog()
    }, [])

    const handlerSubmit = async (e) => {
        setLoad(true)
        e.preventDefault()
        if(!img || !title || !description){
            setError(`Siz ${!img ? "linkni" : ""} ${!title ? "sarlavhani" : ""} ${!description ? "matnni" : ""} kiritmadingiz!`)
            setLoad(false)
            return
        }
        await fetch(`/update/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({blogImg: img, blogTitle: title, blogDescription: description, blogOwner: user._id})
          })
          setLoad(false)
          navigate("/")
          setTimeout(() => {
            setError(null)
          }, 2000);
    }
    return (
        <section className={`py-20 md:w-1/2 w-full px-2 mx-auto ${darkMode ? "bg-black" : ""}`}>
            <h1 className={`font-Title lg:text-5xl md:text-4xl text-3xl pl:my-9 my-5 text-center font-bold ${darkMode ? "text-white": "text-black"} md:py-8 duration-200`}>Tahrirlash</h1>
            <form className="flex flex-col gap-4 w-full" onSubmit={(e) => handlerSubmit(e)}>
                {error && (
                    <p className="py-2 px-3 w-full bg-red-700 text-center rounded-md text-white lg:text-[20px]">{error}</p>
                )}
                <input type="text" className="w-full py-2 px-2 rounded-sm border-black border" placeholder="Rasm linkini kiriting..." value={img} onChange={(e) => setImg(e.target.value)}/>
                <input type="text" className="w-full py-2 px-2 font-semibold rounded-sm border-black border" placeholder="Blog nomini kiriting..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea rows={6} placeholder="Blog haqida yozing.." className="w-full py-2 px-2 font-semibold rounded-sm border-black border" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button className={`border md:py-2 py-1 w-full rounded-md text-[22px] text-center ${darkMode ? "border-white text-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-white"} font-semibold duration-500 ease-in-out`}>Blog qo'shish {load && <CircularProgress size={"23px"} color="white"/>}</button>
                </form>
        </section>
    )
}

export default Edit