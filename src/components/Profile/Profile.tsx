import {useEffect} from "react";
import {getAuth} from "../../redux/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const Profile = () => {
    const {id, login, email, isAuth} = useAppSelector(state => state.auth)

    return (
        <>
            {isAuth ?
                <div>Login</div>
                : <div> No login</div>
            }
            <div>Profile</div>
        </>
    )
}

export default Profile;