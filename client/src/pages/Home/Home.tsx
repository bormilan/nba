import {ReactElement, FC,} from "react";
import {Box, Grid,} from "@mui/material";
import HomeCard from "../../components/HomeCard/HomeCard";
import "./Home.scss"
import ScrollToTop from "react-scroll-to-top";
import Games from "../../Sections/Games/Games";
import Login from "../../Sections/Login/Login";
import Introduction from "../../Sections/Introduction/Introduction";
import { BaseScrollOptions, useHashScroll } from "react-hash-scroll";
import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import React from "react";

export const Home: FC<any> = (): ReactElement => {

    const options: Partial<BaseScrollOptions> = {
        position: "start",
        behavior: "smooth"
    };

    const [sections, setSections] = React.useState<string[]>(["Login", "Games", "Info" ])

    const login_ref = useHashScroll<HTMLDivElement>(sections[0], options);
    const games_ref = useHashScroll<HTMLDivElement>(sections[1], options);
    const introduction_ref = useHashScroll<HTMLDivElement>(sections[2], options);

    return (
        <Grid>
            <ScrollToTop smooth={true}/>
            
            {/* <Link to={"/#login"}>Go To Section 1</Link> */}
            <div className="card-container">
                <HomeNavBar to={sections}/>
                <Box className="first-page">
                    <HomeCard img="https://cdn.nba.com/manage/2022/12/tatum-iso120222.jpg?w=1388&h=1136" title={"Celtics lost to Miami despite the odds"} description={"Even though the huge odds on Miami, the Celtics lost, despite the shine of Tatum."} link={"https://www.nba.com/game/mia-vs-bos-0022200328"}/>
                    <HomeCard img="https://cdn.nba.com/manage/2022/12/lebron-iso120222.jpg?w=1388&h=1136" title={"Lakers beat the eastern top Bucks"} description={"Davis lead Lakers win over Milwaukee. LeBron surpasses Magic for 6th in assists"} link={"https://www.nba.com/game/lal-vs-mil-0022200331"}/>
                    <HomeCard img="https://cdn.nba.com/manage/2022/12/irving-durant120222.jpg?w=1388&h=1136" title={"Nets won over Toronto"} description={"Nets beat surprisingly the shining Raptors. Irving: 27-5-5"} link={"https://www.nba.com/game/tor-vs-bkn-0022200329"}/>
                </Box>
            </div>

            <Login ref={login_ref} setSection={setSections}/>
            <Games ref={games_ref}/>
            <Introduction ref={introduction_ref}/>

        </Grid>
    );
};

export default Home;