import {Button, Col, Form, Input, Row} from "antd";
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getStatus, setStatus} from "../../../redux/profile-reducer";
import {EditOutlined} from "@ant-design/icons";

import styles from "../Profile.module.css"

type PropsType = {
    userId: number | undefined
}
const ProfileStatus: FC<PropsType> = ({userId}) => {
    const [editMode, setEditMode] = useState(false)
    const {status} = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()

    useEffect(() =>{
        dispatch(getStatus(userId))
    }, [userId])
    const activateEditMode = () => {
       setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
    }

    const updateStatus = (values: any) => {
        console.log(values.statusBody)
        dispatch(setStatus(values.statusBody))
        deactivateEditMode()
    }

    return (
        <>
            {!editMode && <Row className={styles.status} align='middle' gutter={10}><Col>{status}</Col> <Col><EditOutlined className={styles.editButton} onClick={activateEditMode}/></Col></Row>}
            {editMode &&
                <Form
                    onFinish={updateStatus}
                    initialValues={{statusBody: status}}
                >
                    <Form.Item name='statusBody'><Input/></Form.Item>
                    <Form.Item><Button htmlType="submit" onSubmit={updateStatus} type='primary'>Изменить статус</Button></Form.Item>
                </Form>
            }
        </>
    )
}

export default ProfileStatus