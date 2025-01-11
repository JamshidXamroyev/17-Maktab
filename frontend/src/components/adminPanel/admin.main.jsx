import { useSelector } from "react-redux"
import AdminWin from "./admin.win"
import AdminBlog from "./admin.blog"

const AdminMain = () => {
  const {darkMode} = useSelector(state => state.mode)
  return (
    <>
      <AdminWin />
      <AdminBlog />
    </>
  )
}

export default AdminMain