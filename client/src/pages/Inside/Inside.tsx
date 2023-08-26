import { Box } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { basicRoutes as appRoutes, RouteStruct } from "../../routes";

const Inside: FC<any> = (): ReactElement => {

    const [routes, setRoutes] = React.useState<RouteStruct[]>(appRoutes);

    const handleSignInOut = (e: React.FormEvent) => {
        e.preventDefault();
    
        // setRoutes(null);
    }

    return (
        <div>
            <Box height="100vh" display="flex" flexDirection="column">
                <Router>
                <Navbar routes={routes}/>
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
    )
}

export default Inside;