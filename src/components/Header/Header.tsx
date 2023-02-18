import styles from './Header.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useEffect} from "react";
import {getAuth, logout} from "../../redux/auth-reducer";
import {Button, Col, Row} from "antd";
import {Link} from "react-router-dom";
import defaultAvatar from "../../img/cat-1.webp";

const Header = () => {
    const {login, isAuth} = useAppSelector(state => state.auth)
    const {photos} = useAppSelector(state => state.profile)

    const dispatch = useAppDispatch()

    console.log(photos.small)
    useEffect(() => {
        dispatch(getAuth());
    }, [dispatch])

    const logoutApp = () => {
        dispatch(logout())
    }

    return <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Row justify='end' align='middle' gutter={12}>
                <Col>
                    {isAuth ? <div className={styles.avatar}><img src={photos.small || defaultAvatar} alt='Avatar'/></div> : ''}</Col>
                <Col className={styles.userName}>
                    {isAuth ?
                        <Row gutter={30} align='middle'>
                            <Col>{login}</Col>
                            <Col><Button onClick={logoutApp}>Выйти</Button></Col>
                        </Row>
                        : <Row><Button><Link to="/login">Войти</Link></Button></Row>}
                </Col>
            </Row>
        </div>
    </header>
}

export default Header;