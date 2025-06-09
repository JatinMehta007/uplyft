import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { Signup } from "./components/signup"
import { Login } from "./components/login"
import Chat from "./components/chat"

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
        
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
