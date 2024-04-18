import React from 'react'
import { Field } from 'redux-form'


function MyPostForm({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
                <Field
                    name='newPost'
                    component={'input'}
                />
                <button>submit</button>
        </form>
    )
}

export default MyPostForm