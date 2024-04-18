import ErrorInput from 'components/ErrorInputs/ErrorInput'
import { required, maxLengthCreator } from 'components/utils/validators/validate'
import React from 'react'
import { Field } from 'redux-form'
import style from './login.module.css'

const maxLength50 = maxLengthCreator(50)

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field 
                placeholder='Email' 
                name='email' 
                component={ErrorInput}
                validate={[required,maxLength50]}
            />
            <Field 
                placeholder='Password' 
                name='password' 
                component={ErrorInput}
                validate={[required,maxLength50]}  
                type='password'
            />
            <div className={style.checkbox}>
            <Field 
                type='checkbox' 
                name='rememberMe' 
                component={'input'}
            /> 
                <span>rememberMe</span>
            </div>
            {
                error && <div className={style.errorBlock}>{error}</div>
            }
            <button>submit</button>
        </form>
    )
}

export default LoginForm