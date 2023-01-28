import React, {useState} from 'react';
import './App.module.css';
import {Col, Row} from 'antd';
import Users from "./components/Users/Users";
import styles from "./App.module.css"

import {Route, Routes} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Navigation from "./components/Navigation/Navigation";
import Header from './components/Header/Header';


const App: React.FC = () => {
    return (
        <>
            <Row>
                <Col span={24}><Header/></Col>
            </Row>
            <div className={styles.appContent}>
                <Row justify="space-between">
                    <Col span={5}> <Navigation/></Col>
                    <Col span={19}><Routes>
                        <Route path='/profile' element={<Profile/>}></Route>
                        <Route path='/users' element={<Users/>}></Route>
                    </Routes></Col>

                </Row>
            </div>
        </>
    )
        ;
}

export default App;
