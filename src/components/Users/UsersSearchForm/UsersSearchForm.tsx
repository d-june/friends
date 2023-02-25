import {Button, Col, Form, Input, Row} from "antd";
import {FC, useEffect} from "react";
import {getUsers} from "../../../redux/users-reducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getUsersFilter} from "../../../selectors/users-selector";

type PropsType = {
    current: number
}
const UsersSearchForm: FC<PropsType> = ({current}) => {

    const filter = useAppSelector(getUsersFilter)
    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({term: filter.term});
    }, [filter, form]);

    const onSubmit = (values: { term: string }) => {
        dispatch(getUsers({currentPage: 1, filter: {term:values.term, friend: filter.friend}}))
    }

    return (
        <Form
            form={form}
            initialValues={{term: filter.term}}
            onFinish={onSubmit}
        >
            <Row gutter={10} justify='center'>
                <Col span={22}><Form.Item name='term'><Input></Input></Form.Item></Col>
                <Col span={2}><Form.Item><Button htmlType="submit" type='primary'>Найти</Button></Form.Item></Col>
            </Row>
        </Form>
    )
}

export default UsersSearchForm;