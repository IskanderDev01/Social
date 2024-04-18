import MyPost from './MyPost'
import { actions } from 'redux/profilePage-reducer'
import { connect } from 'react-redux'
import { AppStateType } from 'redux/redux-store'
import { CommentsType } from 'types/types'

type MapStateToPropsType = {
    comments: Array<CommentsType>
}
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    likeOn: (id: number) => void
    likeOff: (id: number) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        comments: state.profilePage.comments,
    }
}

const MyPostContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {...actions})(MyPost)

export default MyPostContainer