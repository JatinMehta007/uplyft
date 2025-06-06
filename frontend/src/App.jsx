import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { Signup } from "./components/signup"
import { Login } from "./components/login"

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
       {/* <Route path="/" element={<Home/>}></Route> */}
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
