import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Tab from "./pages/Tab";
import Login from "./pages/login";
import PatientSignup from "./pages/patientSignup";
import Speciality from "./pages/speciality";
import { createContext, useState } from "react";
import Dashboard from "./pages/dashboard";

export const menuButton = createContext();

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <menuButton.Provider
        value={{
          mobileOpen,
          handleDrawerToggle,
          selectedIndex,
          handleListItemClick,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/mydoctor" element={<Navbar />}>
              <Route path="/mydoctor" element={<Home />}>
                <Route path="speciality" element={<Speciality />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
              </Route>
              <Route path="auth" element={<Tab />}>
                <Route path="login" element={<Login />} />
                <Route path="patientSignup" element={<PatientSignup />} />
                <Route path="doctorSignup" element={<PatientSignup />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </menuButton.Provider>
    </>
  );
}

export default App;
