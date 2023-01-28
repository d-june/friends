import React from "react";
import {PhotosType} from "../../types/types";
import defaultAvatar from "../../img/cat-1.webp"
import {Button, Col, Row} from "antd";
import styles from './Users.module.css'

type PropsType = {
    id: number
    name: string
    photos: PhotosType
    status: string
}
const User: React.FC<PropsType> = ({id, name, photos, status}) => {
    debugger
    return (
        <div className={styles.userContainer}>
            <Row justify="center" align="middle">
                <Col span={2}>
                    <div className={styles.userPhoto}>
                        <img src={photos.small === null ? defaultAvatar : photos.small} alt='Фото пользователя'/>
                    </div>
                </Col>
                <Col span={19}>
                    <div className={styles.userName}>{name}</div>
                    <div className={styles.userStatus}>{status}</div>
                </Col>
                <Col span={3}><div className={styles.userButton}><Button type="primary">Подписаться</Button></div></Col>
            </Row>
        </div>
    )
}

export default User;