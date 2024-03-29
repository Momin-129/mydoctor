import { Grid } from "@mui/material";
import ResponsiveDrawer from "../components/sidebar";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Speciality from "./speciality";
import Dashboard from "./doctors";
import { menuButton } from "../App";
import DoctorDashboard from "./dashboard";
import Appointments from "./appointments";
import Profile from "./profile";

export default function Home() {
  const { path, setPath } = useContext(menuButton);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${path}`);
  }, [path]);

  return (
    <>
      <Grid container>
        <Grid item md={2}>
          <ResponsiveDrawer setPath={setPath} />
        </Grid>
        <Grid item xs={10}>
          {path == "speciality" && <Speciality />}
          {path == "doctors" && <Dashboard setPath={setPath} />}
          {path == "dashboard" && <DoctorDashboard />}
          {path == "appointments" && <Appointments />}
          {path == "profile" && <Profile />}
        </Grid>
      </Grid>
    </>
  );
}
