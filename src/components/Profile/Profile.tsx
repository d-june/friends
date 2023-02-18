import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";
import {getProfile, saveProfile} from "../../redux/profile-reducer";
import defaultAvatar from "../../img/cat-1.webp"
import styles from "./Profile.module.css"

import {Col, Image, Row} from 'antd';
import ProfileInfo from "../../ProfileInfo/ProfileInfo";
import ProfileForm from "../../ProfileInfo/ProfileForm";
import {ProfileType} from "../../types/types";
import MyPosts from "../MyPosts/MyPosts";

const Profile = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    const {
        lookingForAJob,
        lookingForAJobDescription,
        fullName,
        aboutMe,
        contacts,
        photos
    } = useAppSelector(state => state.profile)

    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getProfile(27167))
    }, [dispatch])

    const onEditMode = () => {
        setEditMode(true)
    }
    const onSubmit = (values: ProfileType) => {
        dispatch(saveProfile(values))
        setEditMode(false)

    }

    return (
        <>

                <section className={styles.profileContainer} >
                    {isAuth ?
                    <Row justify='center' gutter={80}>
                        <Col>
                            <div className={styles.profileImage}>
                                <Image
                                    width={300}
                                    src={photos.large || defaultAvatar}
                                />
                            </div>
                        </Col>
                        <Col span={10}>
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
                    <MyPosts />
                </section>




        </>
    )
}

export default Profile;