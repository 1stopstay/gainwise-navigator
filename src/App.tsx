import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Swap from "./pages/Swap";
import SignalsAndAlerts from "./pages/SignalsAndAlerts";
import ProfitStrategies from "./pages/ProfitStrategies";
import Navigation from "./components/Navigation";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navigation /><Index /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<><Navigation /><Profile /></>} />
        <Route path="/profile/settings" element={<><Navigation /><Settings /></>} />
        <Route path="/swap" element={<><Navigation /><Swap /></>} />
        <Route path="/signals" element={<><Navigation /><SignalsAndAlerts /></>} />
        <Route path="/profit-strategies" element={<><Navigation /><ProfitStrategies /></>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;