import MessageForm from './MessageForm'
const { reduxForm } = require('redux-form')

const MessageReduxForm = reduxForm({form: 'messageForm'})(MessageForm)
export default MessageReduxForm