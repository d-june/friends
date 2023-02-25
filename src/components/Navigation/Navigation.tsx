import { FC } from 'react';
import {NavLink} from 'react-router-dom';
import {UserOutlined, SmileOutlined, TeamOutlined, WechatOutlined} from '@ant-design/icons';
import styles from './Navigation.module.css'
import {useAppSelector} from "../../hooks/hooks";

const App: FC = () => {

    const {autorizedId} = useAppSelector(state => state.auth)

    return (
        <nav className={styles.menuContainer}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}><NavLink className={({isActive}) => (isActive ? styles.menuLink + ' ' + styles.menuLinkActive : styles.menuLink)} to={'/profile/'+autorizedId}><UserOutlined/> Профиль</NavLink></li>
                <li className={styles.menuItem}><NavLink className={({isActive}) => isActive ? styles.menuLink + ' ' + styles.menuLinkActive : styles.menuLink} to='/friends'><SmileOutlined /> Друзья</NavLink></li>
                <li className={styles.menuItem}><NavLink className={({isActive}) => isActive ? styles.menuLink + ' ' + styles.menuLinkActive : styles.menuLink} to='/users'><TeamOutlined/> Пользователи</NavLink></li>
                <li className={styles.menuItem}><NavLink className={({isActive}) => isActive ? styles.menuLink + ' ' + styles.menuLinkActive : styles.menuLink} to='/chat'><WechatOutlined /> Чат</NavLink></li>
            </ul>
        </nav>
    );
};

export default App;