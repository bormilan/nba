import { hslToRgb } from "@material-ui/core";
import { Opacity } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import "./HomeCard.scss"

type Props = {
    img: string
    title: string
    description: string
    link: string
}

const handleClick = () => {
    
}

const HomeCard: FC<any> = ( {img, title, description, link}: Props ) => {
    return (
        <Grid className="homecard" onClick={handleClick}>

            <Box className="picture" sx={{
                backgroundImage: `url(${img})`
            }}></Box>

            <div className="card-title">
                {title}
            </div>
            
            <div className="description">
                {description}
            </div>
            
        </Grid>
    )
}

export default HomeCard;
{/* <img 
data-is-visible="false" 
data-should-scale="false" 
src="https://cdn.nba.com/manage/2022/12/ad120222.jpg" 
srcset="https://cdn.nba.com/manage/2022/12/ad120222.jpg?w=694&amp;h=568 1x, https://cdn.nba.com/manage/2022/12/ad120222.jpg?w=1388&amp;h=1136 2x"
 alt="Full Focus: Davis' huge game helps Lakers edge Bucks" 
 class="BackgroundImageLayer_background__IEXRc" 
 loading="lazy"></img> */}