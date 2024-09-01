import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meal Finder
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
