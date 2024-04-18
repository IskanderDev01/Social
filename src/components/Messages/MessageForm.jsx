import React from 'react'
import { Field } from 'redux-form'

function MessageForm({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit} >
            <Field 
                placeholder='enter your message'
                name='newMessage'
                component={'input'}
            />
            <button ><i className='bx bxs-send'></i></button>
        </form>
    )
}

export default MessageForm