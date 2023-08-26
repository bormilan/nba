// src/componetns/Footer.tsx

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { StayPrimaryLandscape } from "@mui/icons-material";
import packageJson from "../package.alias.json"
import Link from '@mui/material/Link';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ fontFamily: "Courier New" }}>
        {'Copyright © '}
        <Link color="inherit" href="" sx={{ fontFamily: "Courier New" }}>
          nbaStats
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: 'white',
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
       <Copyright sx={{ mt: 0.5 }} />
    </Box>
  );
};

export default Footer;