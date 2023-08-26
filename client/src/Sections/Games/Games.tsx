import { Box } from "@mui/material";
import { forwardRef } from "react";
import "./Games.scss"


const Games = forwardRef<HTMLDivElement>(({ }, ref) => {
    return <div ref={ref} className="section" ></div>
});

export default Games;