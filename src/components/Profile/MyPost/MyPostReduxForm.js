import { reduxForm } from 'redux-form'
import MyPostForm from './MyPostForm';

const MyPostReduxForm = reduxForm({form: 'myPostForm'})(MyPostForm)

export default MyPostReduxForm