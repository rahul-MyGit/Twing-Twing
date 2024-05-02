import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Slidebar from "./components/Slidebar"
import RightPanel from "./components/RightPanel"

function App() {

  return (
    <>
    <BrowserRouter>
    <div className="flex max-w-6xl mx-auto">
      <Slidebar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<Signup />}/>
       <Route path="/login" element={<Login />}/>

      </Routes>
      <RightPanel />
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
