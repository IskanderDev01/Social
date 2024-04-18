import Messages from './Messages'
import { connect } from 'react-redux'
import withAuthRedirect from 'components/hoc/withAuthRedirect'
import { actions } from 'redux/messagePage-reducer'
import { compose } from 'redux'
import { AppStateType } from 'redux/redux-store'
import { LettersType, UserListType } from 'types/types'
import { ComponentType } from 'react'

type MapStateToPropsType = {
    usersList: Array<UserListType>
    letters: Array<LettersType>
    newMessageValue: string
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersList: state.messagePage.usersList,
        letters: state.messagePage.letters,
        newMessageValue: state.messagePage.newMessage,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Messages)
