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

        {/* Dedicated Routes for Mau2 & Variations */}
        <Route path="/mau2" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/mau2/*" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/mau-2" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/mau-2/*" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/Mau2" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/Mau2/*" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/thiep-cuoi/mau2" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/thiep-cuoi/mau2/*" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/templates/mau2" element={<TemplatePage customComponent={Mau2} />} />
        <Route path="/templates/mau-2" element={<TemplatePage customComponent={Mau2} />} />

        {/* Dedicated Routes for Mau1 & Variations */}
        <Route path="/mau1" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/mau1/*" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/mau-1" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/mau-1/*" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/Mau1" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/Mau1/*" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/thiep-tot-nghiep/mau1" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/templates/mau1" element={<TemplatePage customComponent={Mau1} />} />
        <Route path="/templates/mau-1" element={<TemplatePage customComponent={Mau1} />} />

        {/* Dynamic Route for future templates like /mau3, /mau-3, etc. */}
        <Route path="/:templateCode" element={<TemplatePage />} />
        <Route path="/:templateCode/*" element={<TemplatePage />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
