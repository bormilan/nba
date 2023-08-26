import { FC, ReactElement } from "react";
import SignInSide from "../components/SignInSide";

type Props = {
    handleSignInOut: (e: React.FormEvent) => void
}

const Login: React.FC<Props> = ( {handleSignInOut}: Props ): ReactElement => {
    return (
        <SignInSide handleSignInOut={handleSignInOut}/>
    )
}

export default Login;