import {Col, Row} from "antd";
import {ProfileType} from "../../../types/types";
import React, {FC} from "react";
import styles from "../Profile.module.css"
import {
    GithubFilled,
    YoutubeFilled,
    TwitterSquareFilled,
    FacebookFilled,
    LinkOutlined,
    InstagramFilled, EditOutlined
} from "@ant-design/icons";

type onEditMode ={
    onEditMode: () => void
}


const ProfileInfo:FC <ProfileType & onEditMode> = ({fullName, lookingForAJob, lookingForAJobDescription, contacts, aboutMe, onEditMode}) => {
    return (
        <>
            <Row className={styles.profileInfoContainer}>
                <Row>
                    <Row className={styles.row} align='middle' gutter={10}>
                        <Col className={styles.profileInfoName}>{fullName}</Col>
                        <Col onClick={onEditMode}><EditOutlined className={styles.editButton}/></Col>
                    </Row>
                    <Row className={`${styles.subtitle} ${styles.row}`}><Col span={24}><h3>Обо мне:</h3></Col> <Col span={24}>{aboutMe}</Col></Row>

                    {lookingForAJob ? <Row className={`${styles.subtitle} ${styles.row}`}><h3>Профессиональные навыки: </h3>{lookingForAJobDescription}</Row> : ""}
                    <Row className={styles.row}>
                        <Col span={24} className={styles.subtitle}><h3>Контакты:</h3></Col>
                        {contacts.github && <Col span={24}><GithubFilled  className={styles.profileIcon} /> Github: {contacts.github}</Col>}
                        {contacts.vk && <Col span={24}><GithubFilled className={styles.profileIcon}/> VK: {contacts.vk}</Col>}
                        {contacts.facebook && <Col span={24}><FacebookFilled className={styles.profileIcon}/> Facebook: {contacts.facebook}</Col>}
                        {contacts.instagram && <Col span={24}><InstagramFilled className={styles.profileIcon}/> Instagram: {contacts.instagram}</Col>}
                        {contacts.twitter && <Col span={24}><TwitterSquareFilled className={styles.profileIcon}/> Twitter: {contacts.twitter}</Col>}
                        {contacts.youtube && <Col span={24}><YoutubeFilled className={styles.profileIcon}/> YouTube: {contacts.youtube}</Col>}
                        {contacts.mainLink && <Col span={24}><LinkOutlined className={styles.profileIcon} /> MainLink: {contacts.mainLink}</Col>}
                    </Row>
                </Row>
            </Row>
        </>
    )
}

export default ProfileInfo