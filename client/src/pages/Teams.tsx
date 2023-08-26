import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";

export const ENDPOINT = "http://localhost:4000"

const fetcher = (url: string) => 
    fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

const Teams: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage:`url(${"https://cdn.nba.com/teams/uploads/sites/1610612741/2022/11/221125_SamSmith_DeMarDeRozan_Dunk_Bucks_16x9.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
        </Box>
    );
};

export default Teams;