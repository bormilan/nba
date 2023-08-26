import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import {basicRoutes, insideRoutes, RouteStruct} from "./routes"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./styles.css"
import Home from "./pages/Home/Home";


function App() {

  const [routes, setRoutes] = React.useState<RouteStruct[]>(basicRoutes);

  const [loggenIn, setLogging] = React.useState<boolean>(false);

  const handleSignInOut = (e: React.FormEvent) => {
    e.preventDefault();

    setRoutes(insideRoutes);
  }

  return (
    <div>
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
        {/* <Navbar routes={routes}/> */}
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component handleSignInOut={handleSignInOut}/>}
              />
            ))}
          </Routes>
          <Footer />
        </Router>
      </Box>
    </div>
  );

}

export default App;