import React, { FC } from 'react'
import style from './messages.module.css'
import Comments from './Comments/Comments'
import Letter from './Letter/Letter'
import MessageReduxForm from './MessageReduxForm'
import { Navigate } from "react-router-dom";
import { LettersType, UserListType } from 'types/types'

type MessagesType = {
    usersList: Array<UserListType>
    letters: Array<LettersType>
    isAuth: boolean
    addMessage: (newMessage: string) => void
}

const Messages: FC<MessagesType> = ({usersList, letters, isAuth, addMessage}) => {
    if(!isAuth) return <Navigate to="/login" replace={true} />
    
    const onSubmit = (values: any) => {
        addMessage(values.newMessage)
    }

    return (
        <div className={style.content}>
            <div className={style.usersList}>
                <ul>
                    {
                        usersList.map(item =>(
                            <Comments name={item.name} key={item.id}/>
                        ))
                    }
                    
                </ul>
            </div>
            <div className={style.chat}>
                <ul>
                    {
                        letters.map(item =>(
                            <Letter letters={item.letter} key={item.id}/>
                        ))
                    }
                </ul>
            </div>
                <MessageReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Messages