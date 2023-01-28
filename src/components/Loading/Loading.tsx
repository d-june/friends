import {LoadingOutlined} from '@ant-design/icons';
import styles from './Loading.module.css'
const Loading = () => {
    return (
        <>
            <div className={styles.loadingContainer}>
                <LoadingOutlined style={{ fontSize: '100px' }} />
            </div>

        </>
    )
}

export default Loading;