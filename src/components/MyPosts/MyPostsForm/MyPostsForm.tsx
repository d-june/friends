import {Button, Col, Form, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "../MyPosts.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {addPost} from "../../../redux/posts-reducer";
import {postType} from "../../../types/types";
import {useState} from "react";
const MyPostsForm = () => {
    const {photos} = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    const [newPostText, setNewPostText] = useState('')
    const onSubmit = (values: postType) => {
        dispatch(addPost({userAvatar: photos.large, postText: values.postText, likesCount: 5}))
        setNewPostText('')
    }

    return (
        <>
            <Form
                wrapperCol={{ span: 24 }}
                initialValues={{ postText: newPostText }}
                layout="horizontal"
                onFinish={onSubmit}
                className={styles.postsForm}
            >
                    <Row justify='end'>
                        <Col span={24}><Form.Item name='postText'><TextArea value={newPostText} onChange={(e) => setNewPostText(e.currentTarget.value)}></TextArea></Form.Item></Col>
                        <Col> <Button type="primary" htmlType="submit">Отправить</Button></Col>
                    </Row>
            </Form>
        </>
    )
}

export default MyPostsForm;