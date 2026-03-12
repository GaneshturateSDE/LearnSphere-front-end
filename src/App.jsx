
import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/NavBar'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import PageNotFound from './pages/PageNotFound'
import CoursesPage from './pages/CoursesPage'

import ScrollToTop from './components/ScrollTOTop'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './contexts/AuthContext'
import Pricing from './pages/Pricing'
import TermsOfService from './pages/TermsOfServices'
import PrivacyPolicy from './pages/Privacy-policy';
import AdminDashboard from './pages/admin/AdminDashboard'
import Users from './pages/admin/Users'
import Courses from './pages/admin/Courses'
import Categories from './pages/admin/Categories'
import Payments from './pages/admin/Payments'
import Analytics from './pages/admin/Analytics'
import Settings from './pages/admin/Settings'
import DashboardHome from './pages/admin/DashboardHome'


function App() {
 
  const {user} = useAuth();

  return (
    <>
    <ToastContainer
     position='top-right'
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={true}
      closeOnClick
     pauseOnHover
     draggable
    />
    <ScrollToTop/>
    
      <div className="flex flex-col ">
        <div>
          <Navbar />
        </div>
        <div className='mt-15'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={user?<CoursesPage/>:<AuthPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/admin/" element={<AdminDashboard />} >
            
               <Route path="" element={<DashboardHome />} />
               <Route path="users" element={<Users />} />
               <Route path="courses" element={<Courses />} />
               <Route path="categories" element={<Categories />} />
               <Route path="payments" element={<Payments />} />
               <Route path="analytics" element={<Analytics />} />
               <Route path="settings" element={<Settings />} />
            </Route>
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
