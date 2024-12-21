import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Swap from "./pages/Swap";
import SignalsAndAlerts from "./pages/SignalsAndAlerts";
import ProfitStrategies from "./pages/ProfitStrategies";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark">
        <Navigation className="sticky top-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10" />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/signals" element={<SignalsAndAlerts />} />
            <Route path="/profit-strategies" element={<ProfitStrategies />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;