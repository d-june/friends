import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {FC, useState} from "react";
import {ProfileType} from "../../../types/types";
import {
    UserOutlined,
    GithubFilled,
    YoutubeFilled,
    TwitterSquareFilled,
    FacebookFilled,
    LinkOutlined,
    InstagramFilled
} from "@ant-design/icons";
import {useAppSelector} from "../../../hooks/hooks";
import styles from "../Profile.module.css";

type PropsType = {
    onSubmit: (values: ProfileType) => void
}

const ProfileForm: FC<PropsType> = ({onSubmit}) => {

    const {
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts
    } = useAppSelector(state => state.profile)


    return (
        <>
            <Form
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                initialValues={{
                    fullName: fullName,
                    lookingForAJob: lookingForAJob,
                    lookingForAJobDescription: lookingForAJobDescription,
                    aboutMe: aboutMe,
                    contacts: contacts
                }}
                layout="horizontal"
                onFinish={onSubmit}

            >
                <Row className={styles.profileInfoContainer}>
                    <Row className={`${styles.subtitle} ${styles.row}`}>
                        <Col span={24}><Form.Item label="Полное имя" name="fullName"><Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}/></Form.Item></Col>
                    </Row>
                    <Row className={`${styles.subtitle} ${styles.row}`}>
                        <Col span={24}><Form.Item label="Обо мне" name="aboutMe"><TextArea></TextArea></Form.Item></Col>
                    </Row>
                    <Row>
                        <Col span={24}><Form.Item name="lookingForAJob" valuePropName='checked'><Checkbox>Ищу
                            работу</Checkbox></Form.Item></Col>
                    </Row>
                    <Row className={`${styles.subtitle} ${styles.row}`}>
                        <Col span={24}><Form.Item label="Профессиональные навыки:"
                                                  name="lookingForAJobDescription"><TextArea></TextArea></Form.Item></Col>
                    </Row>
                    <Row><h3>Контакты:</h3></Row>
                    <Row className={styles.subtitle}>
                        <Col span={24}><Form.Item label="Github" name={['contacts', 'github']}><Input
                            prefix={<GithubFilled/>}/></Form.Item></Col>
                        <Col span={24}><Form.Item label="VK" name={['contacts', 'vk']}><Input prefix={<GithubFilled/>}/></Form.Item></Col>
                        <Col span={24}><Form.Item label="Facebook" name={['contacts', 'facebook']}><Input
                            prefix={<FacebookFilled/>}/></Form.Item></Col>
                        <Col span={24}><Form.Item label="Instagram" name={['contacts', 'instagram']}><Input
                            prefix={<InstagramFilled/>}/></Form.Item></Col>
                        <Col span={24}><Form.Item label="Twitter" name={['contacts', 'twitter']}><Input
                            prefix={<TwitterSquareFilled/>}/></Form.Item><Form.Item label="YouTube"
                                                                                    name="contacts.youtube"><Input
                            prefix={<YoutubeFilled/>}/></Form.Item></Col>
                        <Col span={24}><Form.Item label="MainLink" name={['contacts', 'mainLink']}><Input
                            prefix={<LinkOutlined/>}/></Form.Item></Col>
                    </Row>
                    <Row><Form.Item><Button htmlType="submit" type="primary">Сохранить</Button></Form.Item></Row>
                </Row>
            </Form>
        </>
    )
}

export default ProfileForm