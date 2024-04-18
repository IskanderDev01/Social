import React from 'react'
import style from './navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className={style.nav}>
            <ul>
            <NavLink to="/profile"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>Profile</li></NavLink>
            <NavLink to="/messages"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>Messages</li></NavLink>
            <NavLink to="/chat"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>Chat</li></NavLink>
            <NavLink to="/users"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>Fing users</li></NavLink>
            <NavLink to="/news"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>News</li></NavLink>
            <NavLink to="/music"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>Music</li></NavLink>
            <NavLink to="/settings"  className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? `${style.active}` : ""
            }><li>Settings</li></NavLink>
            </ul>
        </div>
    )
}

export default Navbar