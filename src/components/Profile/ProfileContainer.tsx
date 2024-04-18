import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getStatus, getUsersProfile, savePhoto, updateStatus } from '../../redux/profilePage-reducer'
import withAuthRedirect from 'components/hoc/withAuthRedirect'
import { compose } from 'redux'
import { withRouter } from 'components/withRouter/withRouter'
import { ProfileType } from 'types/types'
import { AppStateType } from 'redux/redux-store'

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUsersProfile: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
}

type OwnPropsType = {
    router: any
    history: any
}

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.router.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId
            if(!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount(){
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: any, prevState: any, snapShot: any) {
        if(this.props.router.params.userId !== prevProps.router.params.userId){
            this.refreshProfile()
        }
    }
    render(){
        return (
            <Profile 
                {...this.props} 
                isOwner={!this.props.router.params.userId}
                profile = {this.props.profile} 
                status = {this.props.status} 
                updateStatus ={this.props.updateStatus}
                savePhoto = {this.props.savePhoto}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps,{getUsersProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(withRouter(ProfileContainer))
