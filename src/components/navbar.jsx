import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { menuButton } from "../App";

export default function Navbar() {
  const navigate = useNavigate();
  const { mobileOpen, handleDrawerToggle } = useContext(menuButton);
  return (
    <>
      <AppBar position="static" color="transparent" sx={{ padding: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/mydoctor");
            }}
          >
            <img
              src="/mydoctor/images/logo.svg"
              alt="mydoctor"
              style={{ width: "150px" }}
            />
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/mydoctor/auth/login");
              }}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
