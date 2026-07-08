import { Route, Routes } from 'react-router'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { RedirectionPage } from './pages/RedirectionPage/RedirectionPage'

function App() {

  return (
    <Routes>
      <Route path=':url' element={<RedirectionPage/>}></Route>
      <Route index element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App
