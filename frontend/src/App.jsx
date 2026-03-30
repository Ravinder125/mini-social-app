import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import ProtectRoute from "./components/ProtectRoute"

const Login = lazy(() => import("./pages/Login"))
const Social = lazy(() => import("./pages/Social"))
const Signup = lazy(() => import("./pages/Signup"))
const PostDetails = lazy(() => import("./pages/PostDetails"))


const App = () => {
  return (
    <Routes>
      <Route element={<ProtectRoute />}>
        <Route path="/" element={<Social />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App