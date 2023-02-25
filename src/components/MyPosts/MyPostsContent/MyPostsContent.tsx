import {Col, Row} from "antd";
import {useAppSelector} from "../../../hooks/hooks";
import defaultAvatar from "../../../img/cat-1.webp";
import {LikeOutlined} from '@ant-design/icons';
import styles from "../MyPosts.module.css"

const MyPostsContent = () => {
    const {posts} = useAppSelector(state => state.posts)

    return (
        <>
            <Row>
                {posts.map(post => {
                    return <Row className={styles.postContainer}>
                        <Col span={4}><img src={post.userAvatar || defaultAvatar} alt="Avatar"/></Col>
                        <Col span={20}>
                            <Row align='middle' className={styles.postContent}>
                                <Col span={24}>{post.postText}</Col>
                                <Row align='middle' justify='end' gutter={5} className={styles.postLikes}><Col><LikeOutlined /></Col><Col>{post.likesCount}</Col></Row>
                            </Row>
                        </Col>
                    </Row>
                })}
            </Row>
        </>
    )
}

export default MyPostsContent;