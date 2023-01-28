import UserAvatar from '../Avatar/UserAvatar';
import styles from './Header.module.css'

const Header = () => {
    return <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <UserAvatar/>
            <div className={styles.userName}>
                Имя пользователя
            </div>
        </div>
    </div>
}

export default Header;