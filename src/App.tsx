import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { User } from './Types'
import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Main from './pages/Main'
import UserProfilePage from './pages/UserProfilePage'
import ExpandedPostPage from './pages/ExpandedPostPage'
import CreatePost from './components/CreatePost'
import StoryPage from './pages/StoryPage'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [modal, setModal] = useState('')

  useEffect(() => {
    if (localStorage.token) {
      fetch(`http://localhost:4000/validate`, {
        headers: {
          Authorization: localStorage.token
        }
      }).then(res => res.json())
        .then(data => {
          setUser(data)
        })
    } else {
      setUser(null)
    }

  }, [])

  return (
    <div className="App">

      {modal === 'add-post' && <CreatePost user={user} setModal={setModal} />}
      <Routes>
        {user ? <Route path='/' element={<Main user={user} setUser={setUser} setModal={setModal} />} /> : <Route path='/' element={<LogIn setUser={setUser} />} />}
        {/* <Route path='/playstore' element={() => {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=80224A3D-BEEF-4D92-9F44-4A531DCDF7B6&utm_content=lo&utm_medium=badge', true
          return null;
        }} /> */}
        <Route path='/signup' element={<SignUp setUser={setUser} />} />
        <Route path='//:username' element={<UserProfilePage user={user} setUser={setUser} setModal={setModal} />} />
        <Route path='/posts/:id' element={<ExpandedPostPage />} />
        {/* <Route path='/create' element={<CreatePost user={user} />} /> */}
        <Route path='/stories/:id' element={<StoryPage />} />
      </Routes>

    </div>
  )
}

export default App
