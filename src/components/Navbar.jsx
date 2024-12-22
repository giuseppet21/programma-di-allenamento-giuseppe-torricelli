import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">FitTrack</span>
            </Link>
            
            <div className="hidden sm:flex sm:space-x-8">
              <NavLink to="/workouts">Allenamenti</NavLink>
              <NavLink to="/progress">Progressi</NavLink>
              <NavLink to="/profile">Profilo</NavLink>
              <NavLink to="/settings">⚙️ Impostazioni</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        isActive
          ? 'border-indigo-500 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {children}
    </Link>
  )
} 