import React, { useState, memo } from 'react'
import style from '../chatPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from 'redux/chat-reducer'
import { AppStateType } from 'redux/redux-store'

const SendMessageForm = memo(() => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if(!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div className={style.form}>
            <input type="text" onChange={(e: any) => setMessage(e.currentTarget.value)} value={message}/>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}><i className='bx bxs-send'></i></button>
        </div>
    )
})

export default SendMessageForm