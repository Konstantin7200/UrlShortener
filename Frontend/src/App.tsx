import { Route, Routes } from 'react-router'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'

function App() {

  return (
    <Routes>
      <Route path='' element={<></>}></Route>
      <Route index element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App
