import { Box } from "@mui/material"
import { forwardRef } from "react";
import "./Introduction.scss"

const Introduction = forwardRef<HTMLDivElement>(({ }, ref) => {
    return <Box ref={ref} className="introduction"></Box>
});

export default Introduction;