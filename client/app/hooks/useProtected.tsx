import {redirect} from "next/navigation"
import UserAuth from "./UserAuth"

interface ProtectedProps {
    children: React.ReactNode
}

export default function Protected({children}:ProtectedProps){
    const isAuthenticated = UserAuth();

    return isAuthenticated ? children : redirect("/")
}