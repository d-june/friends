import UsersList from "../components/Users/UsersList";

const Friends = () => {
    const pathname = '/friends'
    return (
        <>
            <UsersList filterFriend={true} pathname={pathname} pageName='Друзья'/>
        </>
    )
}

export default Friends