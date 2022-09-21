import { Navigate } from "react-router";
import { accountService } from "../_services/account.service"

const AuthGuard = ({children}) => {
        let logged = accountService.isLogged();

        console.log(logged);
        if (!logged){
            console.log("la");
            return <Navigate to ="/"/>
        }

        return children
    };

export default AuthGuard