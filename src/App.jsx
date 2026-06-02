import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<div>Not found</div>}/>
    </Routes>
  )
}

export default App