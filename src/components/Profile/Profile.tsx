import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate, useParams} from "react-router-dom";
import {editAvatar, getProfile, saveProfile} from "../../redux/profile-reducer";
import defaultAvatar from "../../img/cat-1.webp"
import styles from "./Profile.module.css"
import {EditOutlined} from "@ant-design/icons";

import {Button, Col, Row} from 'antd';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileForm from "./ProfileInfo/ProfileForm";
import {ProfileType} from "../../types/types";
import MyPosts from "../MyPosts/MyPosts";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const Profile = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    const {autorizedId} = useAppSelector(state => state.auth)
    const {id} = useParams()
    const {
        lookingForAJob,
        lookingForAJobDescription,
        fullName,
        aboutMe,
        contacts,
        photos
    } = useAppSelector(state => state.profile)
    console.log(id)

    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getProfile(Number(id)))
    }, [dispatch, id])

    const onEditMode = () => {
        setEditMode(true)
    }
    const onSubmit = (values: ProfileType) => {
        dispatch(saveProfile(values))
        setEditMode(false)
    }

    const editUserAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            dispatch(editAvatar(e.target.files[0]));
            console.log(e.target.files[0])
        }

    }
    return (
        <>

                <section className={styles.profileContainer} >
                    {isAuth ?
                    <Row justify='center' gutter={80}>
                        <Col>
                            <div className={styles.profileImage}>
                                <img src={photos.large || defaultAvatar} alt='avatar'/>
                            </div>
                            {Number(id) === autorizedId && <div><label className={styles.photoEdit}><EditOutlined/><input type='file' className={styles.photoEditInput} onChange={editUserAvatar} /> </label> </div> }
                        </Col>
                        <Col span={10}>
                            <ProfileStatus userId={Number(id)} />
                            {editMode
                                ? <div><ProfileForm onSubmit={onSubmit}/></div>
                                : <div className={styles.profileContent}><ProfileInfo fullName={fullName}
                                                                                      lookingForAJob={lookingForAJob}
                                                                                      lookingForAJobDescription={lookingForAJobDescription}
                                                                                      contacts={contacts}
                                                                                      aboutMe={aboutMe}
                                                                                      onEditMode={onEditMode}/></div>
                            }
                        </Col>
                    </Row>
                        : <Navigate to="/login" replace={true}/>
                    }
                    {Number(id) === autorizedId && <MyPosts />}
                </section>




        </>
    )
}

export default Profile;