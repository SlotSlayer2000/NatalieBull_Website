import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import CrisisPage from "./pages/CrisisPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/crisis" element={<CrisisPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
