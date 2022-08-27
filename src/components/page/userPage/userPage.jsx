import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Loader from '../../common/loader'
// import { useParams } from 'react-router-dom'
import QualitiesList from '../../ui/qualities/qualitiesList'
import UserEditForm from '../../ui/userEditForm'

const UserPage = ({ id }) => {
    const [user, setUser] = useState({})
    const [isEditMode, setIsEditMode] = useState(false)
    console.log(isEditMode)
    // const history = useHistory()
    // const params = useParams()
    // const { mode } = params

    useEffect(() => {
        api.users.getById(id).then((data) => {
            if (typeof data !== 'undefined') {
                setUser(data)
            }
        })
    }, [])

    const handleEditMode = () => {
        setIsEditMode(true)
    }

    return !isEditMode
        ? (
            JSON.stringify(user) !== '{}'
                ? (
                    <div>
                        <h1>{user.name}</h1>
                        <h2>{`Профессия: ${user.profession.name}`}</h2>
                        <QualitiesList user={user} />
                        <h4>{`Завершено встреч: ${user.completedMeetings}`}</h4>
                        <h2>{`Оценка: ${user.rate}`}</h2>
                        <button onClick={handleEditMode} >Изменить</button>
                    </div>
                )
                : <Loader loadingTarget={'user'} margin={5} />
        )
        : <UserEditForm id={id} setIsEditMode={setIsEditMode}/>
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
