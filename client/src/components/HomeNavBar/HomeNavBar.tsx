import { Box, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomeNavBar.scss"

type Props = {
    to: string[]
}

const HomeNavBar = ( {to}: Props ) => {
    console.log(to)
    
    return (
        <Toolbar className="bar">
            <Link to={`/#${to[0]}`} className="button">{`${to[0]}`}</Link>
            <Link to={`/#${to[1]}`} className="button">{`${to[1]}`}</Link>
            <Link to={`/#${to[2]}`} className="button">{`${to[2]}`}</Link>
        </Toolbar>
    )
}

export default HomeNavBar;