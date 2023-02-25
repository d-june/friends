import React from "react";
import {PhotosType} from "../../types/types";
import defaultAvatar from "../../img/cat-1.webp"
import {Button, Col, Row} from "antd";
import styles from './Users.module.css'
import {Link} from "react-router-dom";
import {followSuccess, unfollowSuccess} from "../../redux/users-reducer";
import {useAppDispatch} from "../../hooks/hooks";

type PropsType = {
    id: number
    name: string
    photos: PhotosType
    status: string
    followed: boolean
    followingInProgress: Array<number>
}
const User: React.FC<PropsType> = ({id, name, photos, status, followed, followingInProgress}) => {
    const dispatch = useAppDispatch()
    const follow = (id: number) => {
        dispatch(followSuccess(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollowSuccess(id))
    }
    return (

        <div className={styles.userContainer}>
            <Row justify="center" align="middle">
                <Col span={21}>
                    <Link to={'/profile/' + id}>
                        <Row align="middle" gutter={20}>
                            <Col span={2}>
                                <div className={styles.userPhoto}>
                                    <img src={photos.small === null ? defaultAvatar : photos.small} alt='Фото пользователя'/>
                                </div>
                            </Col>
                            <Col span={22}>
                                <div className={styles.userName}>{name}</div>
                                <div className={styles.userStatus}>{status}</div>
                            </Col>
                        </Row>

                    </Link>
                </Col>

                <Col span={3}>
                    {followed
                    ? <div className={styles.userButton}><Button type="primary" loading={followingInProgress.some(i => i === id)} onClick={() => unfollow(id)}>Отписаться</Button></div>
                        : <div className={styles.userButton}><Button type="primary" loading={followingInProgress.some(i => i === id)} onClick={() => follow(id)}>Подписаться</Button></div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default User;