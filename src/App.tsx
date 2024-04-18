import React, { Component, ComponentType, Suspense } from "react";
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route } from 'react-router-dom';
import MessagesContainer from './components/Messages/MessagesContainer'
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer'
import { compose } from 'redux'
import { withRouter } from './components/withRouter/withRouter'
import { connect } from 'react-redux'
import LoadingUsers from './components/Loadings/LoadingUsers'
import { AppStateType } from 'redux/redux-store'
import { initializeApp } from 'redux/app-reducer'
import UsersPage from 'components/Users/UsersPage'
import ChatPage from 'Pages/Chat/ChatPage'

const Login = React.lazy(() => import('./components/Login/Login'))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void 
}

class App extends Component<MapPropsType & DispatchPropsType>{
  componentDidMount(){
    this.props.initializeApp()
  }
  render (){
    if(!this.props.initialized) {
      return <LoadingUsers />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-content'>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<ProfileContainer/>}/>
              <Route path='/profile' element={<ProfileContainer />}/>
              <Route path='/profile/:userId' element={<ProfileContainer />}/>
              <Route path='/messages/*' element={<MessagesContainer />}/>
              <Route path='/users' element={<UsersPage/>}/>
              <Route path='/login' element={<Login/>} />
              <Route path='/chat' element={<ChatPage/>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App);
