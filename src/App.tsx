import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Swap from "./pages/Swap";
import ProfitStrategies from "./pages/ProfitStrategies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/swap" element={<Swap />} />
        <Route path="/profile/strategies" element={<ProfitStrategies />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
