import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { TemplatePage } from './pages/TemplatePage'
import Mau1 from './Mau1'
import Mau2 from './Mau2'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Catalog / List */}
        <Route path="/" element={<HomePage />} />

        {/* Dedicated Route for Mau1 */}
        <Route path="/mau1" element={<TemplatePage customComponent={Mau1} />} />

        {/* Dedicated Route for Mau2 */}
        <Route path="/mau2" element={<TemplatePage customComponent={Mau2} />} />

        {/* Dynamic Route for future templates like /mau2, /mau-2, etc. */}
        <Route path="/:templateCode" element={<TemplatePage />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
