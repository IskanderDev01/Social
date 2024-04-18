import React, { useEffect, useRef, useState }  from 'react'
import style from './chatPage.module.css'
import Message from './Message/Message'
import SendMessageForm from './SendMessageForm/SendMessageForm'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening } from 'redux/chat-reducer'
import { AppStateType } from 'redux/redux-store'



const ChatPage = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch()
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300){
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(()=>{
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    },[])

    useEffect(()=>{
        if(isAutoScroll){
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    },[messages])
    return (
        <div className={style.chat}>
            <div className={style.content} onScroll={scrollHandler}>
                {
                    messages.map((m, index) => (
                            <Message key={index} message={m}/>
                    ))
                }
                <div ref={messagesAnchorRef}></div>
            </div>
            <div className={style.sendMessage}>
                <SendMessageForm/>
            </div>
        </div>
    )
}

export default ChatPage