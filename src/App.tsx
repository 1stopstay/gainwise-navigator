import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProfitStrategies from "./pages/ProfitStrategies";
import Swap from "./pages/Swap";
import SignalsAndAlerts from "./pages/SignalsAndAlerts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profit-strategies" element={<ProfitStrategies />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/signals" element={<SignalsAndAlerts />} />
      </Routes>
    </Router>
  );
}

export default App;