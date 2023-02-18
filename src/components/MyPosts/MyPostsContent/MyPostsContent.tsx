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
                    return <Row gutter={20} className={styles.postContainer}>
                        <Col span={2}><img src={post.userAvatar || defaultAvatar} alt="Avatar"/></Col>
                        <Col>
                            <Row align='middle' className={styles.postContent}>
                                <Col span={24}>{post.postText}</Col>
                                <Row align='middle' gutter={5}><Col><LikeOutlined /></Col><Col>{post.likesCount}</Col></Row>
                            </Row>
                        </Col>
                    </Row>
                })}
            </Row>
        </>
    )
}

export default MyPostsContent;