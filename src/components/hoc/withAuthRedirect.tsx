import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'

type MapStateToPropsType = {
    isAuth: boolean
}
type PropsType = MapStateToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<PropsType> {
        render(){
            if(!this.props.isAuth) return <Navigate to="/login" replace={true} />
            return <Component {...this.props}/>
        }
    }
    return connect (mapStateToProps) (RedirectComponent)
}
export default withAuthRedirect