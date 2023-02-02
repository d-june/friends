import UserAvatar from '../Avatar/UserAvatar';
import styles from './Header.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useEffect} from "react";
import {getAuth} from "../../redux/auth-reducer";

const Header = () => {
    const {id, login, email, isAuth} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuth());
    }, [dispatch])


    return <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <UserAvatar/>
            <div className={styles.userName}>
                {isAuth ? <div>{login}</div> : <div>Имя пользователя</div>}
            </div>
        </div>
    </div>
}

export default Header;