// other
import {FC} from "react";
import Home from "./pages/Home/Home";
import Players from "./pages/Players";
import SignIn from "./pages/SignIn";
import Teams from "./pages/Teams";

type Props = {
    handleSignInOut: (e: React.FormEvent) => void
}

// interface
export interface RouteStruct {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<Props>
}

export const basicRoutes: Array<RouteStruct> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'signin-route',
        title: 'Sign In',
        path: '/signin',
        enabled: true,
        component: SignIn
    }
]

export const insideRoutes: Array<RouteStruct> = [
    {
        key: 'inside-home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'players-route',
        title: 'Players',
        path: '/players',
        enabled: true,
        component: Players
    },
    {
        key: 'teams-route',
        title: 'Teams',
        path: '/teams',
        enabled: true,
        component: Teams
    },
]