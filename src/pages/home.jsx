import { Grid, Typography } from "@mui/material";
import ResponsiveDrawer from "../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Speciality from "./speciality";
import Dashboard from "./dashboard";
export default function Home() {
  const [path, setPath] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/mydoctor/${path}`);
  }, [path]);

  return (
    <>
      <Grid container>
        <Grid item md={2}>
          <ResponsiveDrawer setPath={setPath} />
        </Grid>
        {path !== "speciality" ? (
          <Grid item xs={10}>
            <Dashboard setPath={setPath} />
          </Grid>
        ) : (
          <Grid item xs={10}>
            <Speciality />
          </Grid>
        )}
      </Grid>
    </>
  );
}
