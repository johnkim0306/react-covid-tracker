import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Diagnosis from "./pages/Diagnosis"; // Import the default export


export function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Diagnosis" element={<Diagnosis />} />
    </Routes>
  )
}