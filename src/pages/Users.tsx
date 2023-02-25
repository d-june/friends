import UsersList from "../components/Users/UsersList"

const Users = () => {
    const pathname = '/users'

    return (
        <UsersList pathname={pathname} pageName='Пользователи'/>
    )
}

export default Users