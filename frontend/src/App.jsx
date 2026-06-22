import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import VolunteerPage from "./pages/VolunteerPage";
import PartnersPage from "./pages/PartnersPage";
import ContactPage from "./pages/ContactPage";
import DonatePage from "./pages/DonatePage";
import AdminPage from "./pages/AdminPage";
import MakeADifferencePage from "./pages/MakeADifferencePage";
import CommunityFridgePage from "./pages/CommunityFridgePage";
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/make-a-difference" element={<MakeADifferencePage />} />
        <Route path="/community-fridge" element={<CommunityFridgePage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;