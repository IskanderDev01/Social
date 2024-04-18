import React, { FC } from 'react'
import banner from '../../img/banner.jpg'
import avatar from '../../img/avatar.jpg'
import style from './profile.module.css'
import MyPostContainer from './MyPost/MyPostContainer'
import LoadingUsers from '../Loadings/LoadingUsers'
import Status from './Status'
import { ProfileType } from 'types/types'

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void 
    isOwner: any
    savePhoto: (file: any) => void
}

const Profile: FC<ProfilePropsType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    const onMainPhotoSelected = (e: any) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={style.content}>
            {
                profile ? <>
                <div className={style.users_date}>
                    <div>
                        <img src={profile.photos.large || profile.photos.small ? profile.photos.large : avatar} alt='ava'/>
                        {
                            isOwner && <input type='file' onChange={onMainPhotoSelected} />
                        }
                    </div>
                    <div>
                        <Status profile={profile} isOwner={isOwner} updateStatus={updateStatus} status={status}/>
                    </div>
                </div></> : <div className={style.loading}><LoadingUsers/></div>
            }
            
            <MyPostContainer/>
        </div>
    )
}

export default Profile