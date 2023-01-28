import {getUsers} from "../../redux/users-reducer";
import User from "./User";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import React, {useEffect} from "react";
import styles from "./Users.module.css"
import Loading from "../Loading/Loading";
import {Breadcrumb} from "antd";
import {HomeOutlined, UserOutlined} from '@ant-design/icons';

const Users = () => {
    const {loading, users} = useAppSelector(state => state.users)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div className={styles.usersContainer}>
            <Breadcrumb>
                <Breadcrumb.Item href="">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <UserOutlined />
                    <span>Application List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Пользователи</Breadcrumb.Item>
            </Breadcrumb>
            {loading
                ? <Loading/>
                : users.map(user => {
                    return <User key={user.id} id={user.id} name={user.name} photos={user.photos}
                                 status={user.status} followed={user.followed}/>
                })
            }


        </div>
    )
}

export default Users;

