import { FC } from 'react';
import './App.module.css';
import {Col, Row} from 'antd';
import UsersList from "./components/Users/UsersList";
import styles from "./App.module.css"

import {Route, Routes} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Navigation from "./components/Navigation/Navigation";
import Header from './components/Header/Header';
import Login from "./pages/Login";
import User from './components/Users/User';
import Friends from "./pages/Friends";
import Users from './pages/Users';
import ChatPage from "./pages/ChatPage";




const App: FC = () => {
    return (
        <div className={styles.appContainer}>
            <Row>
                <Col span={24}><Header/></Col>
            </Row>
            <main className={styles.appContent}>
                <Row justify="space-between">
                    <Col span={24}> <Navigation/></Col>
                    <Col span={24}><Routes>
                        <Route path='/' element={<Profile />}></Route>
                        <Route path='/profile/:id' element={<Profile/>}></Route>
                        <Route path='/profile' element={<Profile/>}></Route>
                        <Route path='/users' element={<Users/>}></Route>
                        <Route path='/friends' element={<Friends/>}></Route>
                        <Route path='/chat' element={<ChatPage/>}></Route>
                        <Route path='/login' element={<Login />}></Route>
                    </Routes></Col>
                </Row>
            </main>
        </div>
    )
        ;
}

export default App;
