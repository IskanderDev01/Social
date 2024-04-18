import React from 'react';
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from 'redux/auth-reducer'
import { AppStateType } from 'redux/redux-store'

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type PropsType = MapStateToPropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<PropsType> {
    render(){
        return(
            <Header login = {this.props.login} isAuth = {this.props.isAuth} logout={this.props.logout} />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType =>{
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStateToPropsType, MapDispatchPropsType, {}, AppStateType >
(mapStateToProps, {logout})(HeaderContainer)