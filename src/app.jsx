import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import EditUserPage from './components/page/editUserPage'
import UserProvider from './hooks/useUsers'
import {ProfessionProvider} from './hooks/useProfession'

const App = () => {
    return (
        <>
            <NavBar />
            <UserProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/users/:userId?" exact component={Users} />
                        <Route path="/users/:userId/edit" component={EditUserPage} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </UserProvider>
            <ToastContainer />
        </>
    )
}

export default App
