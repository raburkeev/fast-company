import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import TextField from '../common/form/textField'
import api from '../../api'
import Loader from '../common/loader'
import PropTypes from 'prop-types'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'

const UserEditForm = ({ id, setIsEditMode }) => {
    const [user, setUser] = useState({})
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    // const history = useHistory()
    const defaultQualityOptions = []
    console.log(user)

    if (JSON.stringify(user) !== '{}' && JSON.stringify(qualities) !== '[]') {
        qualities.forEach((q) => {
            user.qualities.forEach(userQ => {
                if (q.label === userQ.name) {
                    defaultQualityOptions.push({
                        label: q.label,
                        value: q.value
                    })
                }
            })
        })
        console.log('qual', user)
    }

    useEffect(() => {
        api.users.getById(id).then((data) => {
            if (typeof data !== 'undefined') {
                setUser(data)
            }
        })
        api.professions.fetchAll().then(data => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfessions(professionsList)
        })
        api.qualities.fetchAll().then(data => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])

    const handleChange = (target) => {
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { profession, qualities } = user
        api.users.update(id, {
            ...user,
            qualities: getQualities(qualities),
            profession: getProfessionById(profession)
        })
        setIsEditMode(false)
    }

    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }

    return JSON.stringify(user) !== '{}'
        ? (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <h1>Edit</h1>
                            <TextField label="Имя:" onChange={handleChange} value={user.name} name="name" />
                            <TextField label="Электронная почта:" onChange={handleChange} value={user.email} name="email" />
                            <SelectField
                                label="Профессия:"
                                value={user.profession._id}
                                onChange={handleChange}
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' },
                                    { name: 'Other', value: 'other' }
                                ]}
                                label="Выберите ваш пол:"
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                options={qualities}
                                label="Ваши качества:"
                                onChange={handleChange}
                                name="qualities"
                                defaultValue={defaultQualityOptions}
                            />
                            <button className="btn btn-primary w-100 mx-auto">Обновить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5} />
}

UserEditForm.propTypes = {
    id: PropTypes.string.isRequired,
    setIsEditMode: PropTypes.func.isRequired
}

export default UserEditForm
