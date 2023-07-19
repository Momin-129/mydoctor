import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext, useState } from "react";
import { menuButton } from "../App";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { mobileOpen, selectedIndex, handleDrawerToggle, handleListItemClick } =
    useContext(menuButton);

  const handleChangePage = (e) => {
    let path = e.target.textContent.toLowerCase().split(" ").join("");
    props.setPath(path);
  };
  const drawer = (
    <div style={{ height: "100%" }}>
      <List>
        <ListItem
          key={"Dashboard"}
          disablePadding
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemButton onClick={handleChangePage}>
            <ListItemText primary={"Dashboard"} sx={{ fontWeight: "bold" }} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"Speciality"}
          disablePadding
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemButton onClick={handleChangePage}>
            <ListItemText primary={"Speciality"} sx={{ fontWeight: "bold" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Box aria-label="mailbox folders" sx={{ height: "100%" }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            height: "100%",
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block", height: "100%" },
          }}
          PaperProps={{
            style: {
              position: "static",
              padding: "20px",
              height: "100%",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
