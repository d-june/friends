import {followSuccess, getUsers, unfollowSuccess} from "../../redux/users-reducer";
import User from "./User";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import React, {FC, useEffect, useState} from "react";
import styles from "./Users.module.css"
import Loading from "../Loading/Loading";
import {Breadcrumb, Col, Pagination, PaginationProps, Row} from "antd";
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import UsersSearchForm from "./UsersSearchForm/UsersSearchForm";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from 'query-string';
import {getUsersFilter} from "../../selectors/users-selector";

type QueryParamsType = { term?: string; page?: string; }

type PropsType = {
    filterFriend?: boolean | null
    pathname: string
    pageName: string
}
const UsersList: FC<PropsType> = ({filterFriend, pathname, pageName}) => {
    const {loading, users, followingInProgress, totalCount, filter, currentPage} = useAppSelector(state => state.users)
    //const filter = useAppSelector(getUsersFilter)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search.substr(1))
        let actualPage = currentPage
        if (!!parsed.page) actualPage = Number(parsed.page)
        let actualFilter = {term: '', friend: null as boolean | null}
        if(filterFriend === true) {
            actualFilter = {term: filter.term, friend: filterFriend}
        } else {
            actualFilter = {term: filter.term, friend: null}
        }
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        dispatch(getUsers({currentPage: actualPage, filter: actualFilter}))

        return function cleanup() {
            dispatch(getUsers({currentPage: 1, filter: {term: '', friend: null}}))
        };
    }, [dispatch])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: pathname,
            search: queryString.stringify(query)
        })
    }, [filter.term, currentPage])


    const onChange: PaginationProps['onChange'] = (page) => {
        dispatch(getUsers({currentPage: page, filter: {term: filter.term, friend: filter.friend}}))
    };

    return (
        <>
            <Row justify="center" gutter={[16, 16]}>
                <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
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
                                         followingInProgress={followingInProgress}/>
                        })
                    }
                </Col>
            </Row>
        </>


    )
}

export default UsersList;

