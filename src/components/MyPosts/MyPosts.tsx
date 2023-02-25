import {Col, Row} from "antd";
import MyPostsContent from "./MyPostsContent/MyPostsContent";
import MyPostsForm from "./MyPostsForm/MyPostsForm";
import styles from "./MyPosts.module.css"
const MyPosts = () => {
    return (
        <>
            <Row className={styles.postsContainer}>
                <h2 className={styles.postsTitle}>Мои посты</h2>
                <Col span={24}><MyPostsContent /></Col>
                <Col span={24}><MyPostsForm /></Col>
            </Row>
        </>
    )
}

export default MyPosts;