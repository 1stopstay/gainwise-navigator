import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Swap from "./pages/Swap";
import SignalsAndAlerts from "./pages/SignalsAndAlerts";
import ProfitStrategies from "./pages/ProfitStrategies";
import CryptoScanner from "./pages/CryptoScanner";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/signals" element={<SignalsAndAlerts />} />
        <Route path="/profit-strategies" element={<ProfitStrategies />} />
        <Route path="/scanner" element={<CryptoScanner />} />
      </Routes>
    </Router>
  );
}

export default App;