import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Login = lazy(() => import("./pages/Login"))
const Social = lazy(() => import("./pages/Social"))
const Signup = lazy(() => import("./pages/Signup"))


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Social />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App