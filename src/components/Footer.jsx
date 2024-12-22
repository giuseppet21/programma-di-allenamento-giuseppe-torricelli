export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-indigo-600">Fitness Program</h3>
            <p className="text-gray-600 text-sm">
              Il tuo programma di allenamento personalizzato
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-sm">Menu Rapido</h4>
            <ul className="space-y-1">
              <li><a href="/" className="text-gray-600 hover:text-indigo-600 text-sm">Home</a></li>
              <li><a href="/workouts" className="text-gray-600 hover:text-indigo-600 text-sm">Allenamenti</a></li>
              <li><a href="/profile" className="text-gray-600 hover:text-indigo-600 text-sm">Profilo</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-6 text-center text-gray-600 text-sm">
          <p>&copy; 2024 Fitness Program</p>
        </div>
      </div>
    </footer>
  )
} 