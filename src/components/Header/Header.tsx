import React, { FC } from 'react'
import log from '../../img/logotype.jpg'
import style from './header.module.css'
import avatar from '../../img/avatar.jpg'
import { NavLink } from 'react-router-dom'

type HeaderType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const Header: FC<HeaderType> = ({login, isAuth,logout}) => {

    if(isAuth) {
        return (
            <div className={style.header}>
                <img src={log} alt='logo'/>
                <div className={style.login}>
                    <div>{login} <button onClick={logout}><i className='bx bx-log-out'></i></button></div>
                    <img src={avatar} alt='ava' />
                </div> 
            </div>
        )
    }
    else {
        return (
            <div className={style.header}>
                <img src={log} alt='logo'/>
                <div className={style.login}>
                    <div><NavLink to='/login'>Login</NavLink></div>
                </div> 
            </div>
        )
    }
}

export default Header