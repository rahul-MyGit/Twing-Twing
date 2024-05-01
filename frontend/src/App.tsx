import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"

function App() {

  return (
    <>
    <BrowserRouter>
    <div className="flex max-w-6xl mx-auto">
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<Signup />}/>
       <Route path="/login" element={<Login />}/>

      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
