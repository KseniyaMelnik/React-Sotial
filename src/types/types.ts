export type ProfileType =  {
    aboutMe: string;
    contacts : ContactsType,
    fullName: string,
    lookingForAJob: boolean,
    photos: PhotosType
    userId: number
    lookingForAJobDescription: string
}
export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    mainLink: string | null,
    github: string | null,
}

export type PhotosType = {
    small: string,
    large: string
}

export type PostType = {
    id: number,
    message: string,
    likesCount: number,
    image: string
}