import {Button, Col, Form, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import MyPostsContent from "./MyPostsContent/MyPostsContent";
import MyPostsForm from "./MyPostsForm/MyPostsForm";
import styles from "./MyPosts.module.css"
const MyPosts = () => {
    return (
        <>
            <Row className={styles.postsContainer}>
                <h1>Мои посты</h1>
                <Col span={24}><MyPostsContent /></Col>
                <Col span={24}><MyPostsForm /></Col>
            </Row>
        </>
    )
}

export default MyPosts;