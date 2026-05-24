import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SuperpowerProvider } from "./context/SuperpowerContext"
import Home from "./pages/Home"
import About from "./pages/About"
import SuperpowerList from "./pages/SuperpowerList"
import SuperpowerDetail from "./pages/SuperpowerDetail"
import SuperpowerEdit from "./pages/SuperpowerEdit"
import AddSuperpower from "./pages/AddSuperpower"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <SuperpowerProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/superpowers" element={<SuperpowerList />} />
          <Route path="/superpowers/new" element={<AddSuperpower />} />
          <Route path="/superpowers/:id" element={<SuperpowerDetail />} />
          <Route path="/superpowers/:id/edit" element={<SuperpowerEdit />} />
        </Routes>
      </SuperpowerProvider>
    </BrowserRouter>
  )
}

export default App
