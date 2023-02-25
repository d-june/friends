import {followSuccess, getUsers, unfollowSuccess} from "../../redux/users-reducer";
import User from "./User";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import React, {useEffect, useState} from "react";
import styles from "./Users.module.css"
import Loading from "../Loading/Loading";
import {Breadcrumb, Col, Pagination, PaginationProps, Row} from "antd";
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from 'query-string';
import {getUsersFilter} from "../../selectors/users-selector";

type QueryParamsType = { term?: string; page?: string; }
const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {loading, users, followingInProgress, totalCount} = useAppSelector(state => state.users)
    const filter = useAppSelector(getUsersFilter)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search.substr(1))
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        setCurrentPage(actualPage);

        dispatch(getUsers({currentPage: actualPage, filter: actualFilter}))
    }, [dispatch])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const follow = (id: number) => {
        dispatch(followSuccess(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollowSuccess(id))
    }

    const onChange: PaginationProps['onChange'] = (page) => {
        dispatch(getUsers({currentPage: page, filter}))
        setCurrentPage(page);
    };

    return (
        <>
            <Row justify="center" gutter={[16, 16]}>
                <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <UserOutlined/>
                            <span>Application List</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Пользователи</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={24}>
                    <UsersSearchForm current={currentPage}/>
                </Col>
                <Col>
                    <Pagination current={currentPage} onChange={onChange} total={totalCount}/>
                </Col>
                <Col span={24}>
                    {loading
                        ? <Loading/>
                        : users.map(user => {
                            return <User key={user.id} id={user.id} name={user.name} photos={user.photos}
                                         status={user.status} followed={user.followed}
                                         followingInProgress={followingInProgress} follow={follow} unfollow={unfollow}/>
                        })
                    }
                </Col>
            </Row>
        </>


    )
}

export default Users;

