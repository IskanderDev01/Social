import React, { FC } from 'react'
import style from '../chatPage.module.css'
import avatar from '../../../img/usersAva.jpg'
import { ChatMessageType } from 'components/api/chat-api'

const Message: FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div className={style.message}>
            <div className={style.profile}><img src={avatar} alt='a'/> <span>{message.userName}</span></div>
            <div className={style.mess}>{message.message}</div>
        </div>
    )
}

export default Message