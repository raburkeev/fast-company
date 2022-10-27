import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getIsLoggedIn} from '../../store/users'

const ProtectedRoute = ({component: Component, children, ...rest}) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <Route {...rest} render={(props) => {
            console.log(isLoggedIn)
            if (!isLoggedIn) {
                return <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }
                }/>
            }
            return Component ? <Component {...props} /> : children
        }} />
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    component: PropTypes.func,
    location: PropTypes.object
}

export default ProtectedRoute
