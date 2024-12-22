import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-4xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
} 