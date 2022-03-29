import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { User } from './Types'
import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'

function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<LogIn />} />
        {/* <Route path='/playstore' element={() => {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=80224A3D-BEEF-4D92-9F44-4A531DCDF7B6&utm_content=lo&utm_medium=badge', true
          return null;
        }} /> */}
      </Routes>

    </div>
  )
}

export default App
