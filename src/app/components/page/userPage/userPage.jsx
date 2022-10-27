import React from 'react'
import {useParams} from 'react-router-dom'
import Loader from '../../common/loader'
import UserInfoCardComponent from '../../ui/userInfoCardComponent'
import QualitiesCardComponent from '../../ui/qualitiesCardComponent'
import CompletedMeetingsCardComponent from '../../ui/completedMeetingsCardComponent'
import Comments from '../../ui/comments'
import {useUsers} from '../../../hooks/useUsers'
import {CommentsProvider} from '../../../hooks/useComments'
import {useSelector} from 'react-redux'
import {getProfessionById} from '../../../store/professions'

const UserPage = () => {
    const {userId} = useParams()
    const {getUserById} = useUsers()
    const user = getUserById(userId)
    const profession = useSelector(getProfessionById(user.profession))

    return user && profession
        ? (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCardComponent id={user._id} name={user.name} profession={profession}
                            rate={user.rate} img={user.img}/>
                        <QualitiesCardComponent user={user}/>
                        <CompletedMeetingsCardComponent completedMeetings={user.completedMeetings}/>
                    </div>

                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments userId={userId} />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5}/>
}

export default UserPage
