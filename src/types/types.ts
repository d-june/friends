export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean

}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string | null

}

export type ProfileType = {
    userId?: number | null
    fullName: string | null
    lookingForAJob?: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: ProfileContactsType
    photos?: ProfilePhotosType



}

export type ProfileContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type ProfilePhotosType = {
    small: string | null
    large: string | null | undefined
}

export type postType = {
    userAvatar?: string | null
    postText: string | null
    likesCount?: number | null
}
