// src/components/Navbar.tsx

import React, { FC, ReactElement } from "react";
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { RouteStruct } from "../../routes";
import { NavLink } from "react-router-dom";
import { AlignVerticalCenterRounded, ArrowRightAlt } from "@mui/icons-material";
import "./Navbar.scss"

type Props = {
    routes: RouteStruct[]; 
}

const Navbar = ( {routes} : Props ): ReactElement => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box className="container">
      <Container maxWidth="xl" >
        <Toolbar>
          <Typography
            className="text"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            NbaStats.com
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((page) => (
                <Link
                  className="text"
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {routes.map((page) => (
                <div className="nav-element">
                    <Link
                    key={page.key}
                    component={NavLink}
                    to={page.path}
                    color="black"
                    underline="none"
                    variant="button"
                    sx={{
                        alignSelf:"center",
                        fontSize: "large", 
                        marginLeft: "2rem", 
                    }}
                    >
                    {page.title}
                    </Link>
              </div>))}
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" href="https://www.nba.com/">
                nba.com
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;