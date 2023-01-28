import {getUsers} from "../../redux/users-reducer";
import User from "./User";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useEffect} from "react";
import styles from "./Users.module.css"

const Users = () => {
    const {users} = useAppSelector(state => state.users)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div className={styles.usersContainer}>
            {users.map(user => {
                return <User key={user.id} id={user.id} name={user.name} photos={user.photos} status={user.status} />
            })}

        </div>
    )
}

export default Users;

