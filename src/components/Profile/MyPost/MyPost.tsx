import React, { FC } from 'react'
import style from './MyPost.module.css'
import Post from '../Post/Post'
import MyPostReduxForm from './MyPostReduxForm'
import { CommentsType } from 'types/types'

type MyPostType = {
    comments: Array<CommentsType>
    addPost: (newPostText: string) => void
    likeOn: (id: number) => void
    likeOff: (id: number) => void
}

const MyPost: FC<MyPostType> = ({comments, addPost, likeOn, likeOff}) => { 
    const onSubmit = (values: any) => {
        addPost(values.newPost)
    }
    return (
        <div className={style.block}>
            <span>My post</span>
                <MyPostReduxForm onSubmit={onSubmit}/>
                    <div className={style.comments}>
                        {
                            comments.map(item =>(
                                <Post 
                                    comment={item.comment} 
                                    liked={item.liked}
                                    likes={item.likes} 
                                    id={item.id}
                                    key={item.id}
                                    likeOn={likeOn}
                                    likeOff={likeOff}
                                />
                            ))
                        }
                    </div>
        </div>
    )
}

export default MyPost