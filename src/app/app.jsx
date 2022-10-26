import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import {ProfessionProvider} from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import {useDispatch} from 'react-redux'
import {loadQualitiesList} from './store/qualities'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    return (
        <div>
            <AuthProvider>
                <NavBar/>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                        <Redirect to="/"/>
                    </Switch>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer/>
        </div>
    )
}

export default App
