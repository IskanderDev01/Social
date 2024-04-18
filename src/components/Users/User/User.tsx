import React, { FC } from 'react'
import style from './user.module.css'
import avatar from '../../../img/usersAva.jpg'
import { NavLink } from 'react-router-dom'
import { PhotosType } from 'types/types'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unFollow } from 'redux/usersPage-reducer'
import { getDisabledBtn } from 'redux/users-selectors'

type UserPropsType = {
    id: number
    followed: boolean
    photos: PhotosType
    name: string
    status: string
}

const User: FC<UserPropsType> = ({id, followed, photos, name, status}) => {
    const disabledBtn = useSelector(getDisabledBtn)
    const dispatch = useDispatch()
    const followOn = (id: number) => {
        dispatch(follow(id))
    } 
    const followOff = (id: number) => {
        dispatch(unFollow(id))
    } 
        return (
            <div className={style.item}>
                        <NavLink to={`/profile/${id}`}>
                            <div className={style.img}><img src={photos.small ? photos.small : avatar} alt='ava'/></div>
                        </NavLink>
                        <div className={style.usersDate}>
                            <div>{name}</div>
                            <div>{status}</div>
                        </div>
                        
                        {
                            followed ? <div className={style.unFollowButton}><button 
                            disabled={disabledBtn.some(someID => someID===id )} 
                            onClick={()=>{followOff(id)}}>отписаться</button></div>
                            : <div className={style.followButton}><button 
                            disabled={disabledBtn.some(someID => someID===id )}
                            onClick={()=>{followOn(id)}}>подписаться</button></div>
                        }
                        
            </div>
        )
}

export default User