import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '@pages/Landing'
import GenderSelection from '@pages/GenderSelection'
import GoalSelection from '@pages/GoalSelection'
import MuscleDetails from '@pages/MuscleDetails'
import WeightLossPlan from '@pages/WeightLossPlan'
import NutritionalAI from '@components/NutritionalAI'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gender-selection" element={<GenderSelection />} />
        <Route path="/goal-selection" element={<GoalSelection />} />
        <Route path="/muscle-details" element={<MuscleDetails />} />
        <Route path="/weight-loss-plan" element={<WeightLossPlan />} />
        <Route path="/nutritional-ai" element={<NutritionalAI />} />
      </Routes>
    </Router>
  )
}

export default App