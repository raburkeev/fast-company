import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUserData} from '../../store/users'
import Loader from '../common/loader'

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData())
    const [isOpen, setOpen] = useState(false)

    const toggleMenu = () => {
        setOpen(prevState => !prevState)
    }

    if (!currentUser) return <Loader loadingTarget={'current user'}/>

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.img}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={`w-100 dropdown-menu text-center ${isOpen ? 'show' : ''}`}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                <Link to={'/logout'} className="dropdown-item">Logout</Link>
            </div>
        </div>
    )
}

export default NavProfile
