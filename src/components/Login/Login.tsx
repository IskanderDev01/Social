import React from 'react'
import LoginReduxForm from './LoginReduxForm'
import style from './login.module.css'
import { login } from 'redux/auth-reducer'
import { Navigate } from 'react-router-dom'
import { AppStateType } from 'redux/redux-store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const Login = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    }
    if(isAuth) {
        return (
            <Navigate to='/profile' replace={true}/>
        )
    }
    else {
        return (
        <div className={style.login}>
            <div className={style.page}>Login</div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
        )
    }
}

export default Login