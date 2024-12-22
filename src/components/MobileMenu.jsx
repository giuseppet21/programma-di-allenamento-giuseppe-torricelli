export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div 
      className={`
        fixed inset-0 z-50 lg:hidden
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Overlay scuro */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Menu contenuto */}
      <div className="absolute right-0 h-full w-64 bg-white shadow-xl">
        <div className="p-6 space-y-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600"
          >
            ✕
          </button>
          
          <nav className="space-y-4">
            <a 
              href="/" 
              className="block text-lg font-medium text-gray-700 hover:text-indigo-600"
            >
              Home
            </a>
            <a 
              href="/workouts" 
              className="block text-lg font-medium text-gray-700 hover:text-indigo-600"
            >
              Allenamenti
            </a>
            <a 
              href="/profile" 
              className="block text-lg font-medium text-gray-700 hover:text-indigo-600"
            >
              Profilo
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
} 