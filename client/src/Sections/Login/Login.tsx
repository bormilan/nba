import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, Input, InputAdornment, InputLabel, Link } from "@mui/material";
import React from "react";
import { FC, forwardRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./Login.scss"

type Props = {
    setSection: React.Dispatch<React.SetStateAction<string[]>>;
}

const Login = forwardRef<HTMLDivElement, Props>(({ setSection }, ref) => {
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false,
    });
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    
    const handleValueChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("asd")

        if (values.username === "admin" && values.password === "kiskacsa") {
            setSection(["Home", "MyBets", "Friends"]);
            console.log("test")
            navigate("/");
        }
    }
    
    return (
        <div ref={ref} className="login-container">
            <div className="login-card">
                <div className="title">Sign in with your account</div>
                <Box component="form" className="login" onSubmit={handleSubmit}>
                    <div className="input">
                        <InputLabel htmlFor="standard-adornment-username" sx={{ fontFamily: "Courier New" }}>
                            Username
                        </InputLabel>
                        <Input
                            className="input"
                            type={"text"}
                            onChange={handleValueChange("username")}
                            value={values.username}
                            sx={{ fontFamily: "Courier New" }}
                        />
                    </div>
                    <div className="input">
                        <InputLabel htmlFor="standard-adornment-password" sx={{ fontFamily: "Courier New" }}>
                            Password
                        </InputLabel>
                        <Input
                            className="input"
                            type={values.showPassword ? "text" : "password"}
                            onChange={handleValueChange("password")}
                            value={values.password}
                            sx={{ fontFamily: "Courier New" }}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }/>
                    </div>
                    <Button
                        className="submit-button"
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ 
                            mt: 5, mb: 2, width: "50%", color: "black", borderColor: "black",
                            // '&:hover': {
                            //     backgroundColor: "transparent"
                            // }
                         }}
                        >
                            Sign In
                    </Button>
                </Box>
                <div></div>
            </div>
        </div>
    )
});

export default Login;