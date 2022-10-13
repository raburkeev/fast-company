import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../../api'
import Loader from '../../common/loader'
import UserInfoCardComponent from '../../ui/userInfoCardComponent'
import QualitiesCardComponent from '../../ui/qualitiesCardComponent'
import CompletedMeetingsCardComponent from '../../ui/completedMeetingsCardComponent'
import Comments from '../../ui/comments'

const UserPage = () => {
    const {userId} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            if (typeof data !== 'undefined') {
                setUser(data)
            }
        })
    }, [])

    return user
        ? (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCardComponent id={userId} name={user.name} profession={user.profession}
                            rate={user.rate}/>
                        <QualitiesCardComponent user={user}/>
                        <CompletedMeetingsCardComponent completedMeetings={user.completedMeetings}/>
                    </div>

                    <div className="col-md-8">
                        <Comments userId={userId} />
                    </div>
                </div>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5}/>
}

export default UserPage
