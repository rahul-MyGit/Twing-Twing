import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Slidebar from "./components/Slidebar"
import RightPanel from "./components/RightPanel"
import NotificationPage from "./pages/notification/Notifications"
import ProfilePage from "./pages/profile/ProfilePage"

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
       <Route path="/notifications" element={<NotificationPage />}/>
       <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
