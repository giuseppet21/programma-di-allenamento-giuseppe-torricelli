import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '@pages/Landing'
import GenderSelection from '@pages/GenderSelection'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gender-selection" element={<GenderSelection />} />
        <Route path="/workouts" element={<div>Workouts Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  )
}

export default App