import React, { FC } from 'react'
import profile from '../../../img/usersAva.jpg'
import { Link } from 'react-router-dom'

type CommentsType = {
    name: string
}

const Comments: FC<CommentsType> = ({name}) => {
    return (
        <li><Link to='/messages/1'><img src={profile} alt='ava'/><span>{name}</span></Link></li>
    )
}

export default Comments