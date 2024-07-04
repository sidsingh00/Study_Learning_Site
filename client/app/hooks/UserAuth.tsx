import { useSelector } from "react-redux";

export default function UserAuth() {
    const {user} = useSelector((state:any) => state.auth);
    console.log("user", user)

    if(user) {
        return true
    }
    else{
        return false
    }
}