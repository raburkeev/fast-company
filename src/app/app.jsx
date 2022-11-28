import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => {
    return (
        <div>
            <AppLoader>
                <AuthProvider>
                    <NavBar/>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                        <Redirect to="/"/>
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer/>
        </div>
    )
}

export default App
