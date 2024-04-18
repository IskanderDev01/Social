import LoginForm from './LoginForm'
const { reduxForm } = require('redux-form')

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginReduxForm