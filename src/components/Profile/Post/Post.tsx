import React, { FC } from 'react'
import style from './post.module.css'
import usersAva from '../../../img/usersAva.jpg'

type PostType = {
    comment: string
    liked: boolean
    likes: number
    likeOn: (id: number) => void
    likeOff: (id: number) => void
    id: number
}

const Post: FC<PostType> = ({comment, liked, likes, likeOn, likeOff, id}) => {
    return (
            <div className={style.post}>
                <div>
                    <img src={usersAva} alt='ava'/> 
                    <span>{comment}</span>
                </div>
                <div>
                    {
                        liked ? <button onClick={()=>{likeOff(id)}}><i className='bx bxs-like' ></i></button> 
                        : <button onClick={()=>{likeOn(id)}}><i className='bx bx-like' ></i></button>
                    }
                    <span>{likes}</span>
                </div>
            </div>
        )
}

export default Post