import { useState } from "react"
import { useSelector } from "react-redux"


const AdminWin = () => {
    const [img, setImg] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [load, setLoad] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)

    const {darkMode} = useSelector(state => state.mode)

    const clearInput = () => {
        setTimeout(() => {
            setTitle("")
            setImg("")
            setDescription("")
            setError(null)
            setMsg(null)
        }, 2400);
    }

    const handlerSubmit = async e => {
        e.preventDefault()
        setLoad(true)
        if(!img || !title || !description){
            setError(`Siz ${!img ? "linkni" : ""} ${!title ? "sarlavhani" : ""} ${!description ? "matnni" : ""} kiritmadingiz!`)
            clearInput()
            return
        }

        // Fetch
        setMsg("Tabriklayman! Ma'lumotlaringiz qo'shildi.")
        setLoad(false)
        clearInput()
    }

  return (
    <section className={`pt-24 pb-8 ${darkMode ? "bg-black" : "bg-white"} border-b`}>
        <h1 className={`lg:text-5xl md:text-4xl text-3xl font-bold font-Title text-center py-4 ${darkMode ? "text-white" : "text-black"}`}>Admin Panel</h1>
        <div className="w-full flex flex-col items-center justify-center gap-5 md:w-1/2 md:mx-auto px-4">
          <h1 className={`lg:text-4xl md:text-3xl text-2xl font-bold font-Title text-center py-4 ${darkMode ? "text-white" : "text-black"}`}>Yutuq Qo'shish</h1>
            <form className="flex flex-col gap-4 w-full" onSubmit={(e) => handlerSubmit(e)}>
            {error && (
                <p className="py-2 px-3 w-full bg-red-700 text-center rounded-md text-white lg:text-[20px]">{error}</p>
              )}
              {msg && (
                <p className="py-2 px-3 w-full bg-green-700 text-center rounded-md text-white lg:text-[20px]">{msg}</p>
              )}
              <input type="text" className="w-full py-2 px-2 rounded-sm border-black border" placeholder="Rasm linkini kiriting..." value={img} onChange={(e) => setImg(e.target.value)}/>
              <input type="text" className="w-full py-2 px-2 font-semibold rounded-sm border-black border" placeholder="Yutuq nomini kiriting..." value={title} onChange={(e) => setTitle(e.target.value)}/>
              <textarea rows={6} placeholder="Yutuq haqida yozing.." className="w-full py-2 px-2 font-semibold rounded-sm border-black border" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              <button className={`border md:py-2 py-1 w-full rounded-md text-[22px] text-center ${darkMode ? "border-white text-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-white"} font-semibold duration-500 ease-in-out`}>Yutuq qo'shish</button>
            </form>
        </div>
    </section>
  )
}

export default AdminWin