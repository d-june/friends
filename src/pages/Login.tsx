import {Alert, Button, Checkbox, Col, Form, Input, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {login} from "../redux/auth-reducer";
import {LoginType} from "../types/types";
import React, {useState} from 'react';
import {Navigate} from "react-router-dom";


const Login = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const [error, setError] = useState(null)
    const [form] = Form.useForm();

    const onSubmit = (values: LoginType) => {
        const {email, password, rememberMe} = values

        dispatch(login({email, password, rememberMe}))
            .unwrap()
            .then(() => {
                setError(null)
            })
            .catch((rejectedValueOrSerializedError) => {
                setError(rejectedValueOrSerializedError)
            })
    }

    return (
        <>
            {isAuth ? <Navigate to='/'/>
                : <Row justify="center">
                    <Col span={10} style={{padding: 50}}>
                        <Form
                            name="validate_other"
                            initialValues={{rememberMe: true}}
                            onFinish={onSubmit}
                            form={form}
                            autoComplete="off"

                        >
                            <Form.Item label="Username" name="email" hasFeedback rules={[
                                {
                                    type: 'email',
                                    message: 'Перепроверьте пожалуйста e-mail',
                                },
                                {
                                    required: true,
                                    message: 'Введите e-mail',
                                },
                            ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                            </Form.Item>
                            <Form.Item label="Password" name="password"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Введите пароль',
                                           },
                                       ]}
                                       hasFeedback
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                       placeholder="Password"/>
                            </Form.Item>
                            <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{span: 10}}><Checkbox>Remember
                                me</Checkbox></Form.Item>

                            {error && <Alert
                                message='E-mail или пароль введены не верно'
                                type="error"
                                showIcon
                                style={{marginBottom: 20}}

                            />
                            }

                            <Form.Item wrapperCol={{offset: 10, span: 10}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            }
        </>
    )
}

export default Login;


