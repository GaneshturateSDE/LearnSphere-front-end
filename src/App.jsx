
import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/NavBar'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import PageNotFound from './pages/PageNotFound'
import CoursesPage from './pages/CoursesPage'

function App() {


  return (
    <>
      <div className="flex flex-col gap-0">
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/courses" element={<CoursesPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>

    </>
  )
}

export default App
