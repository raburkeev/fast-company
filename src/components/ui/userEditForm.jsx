import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import TextField from '../common/form/textField'
import api from '../../api'
import Loader from '../common/loader'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'

const UserEditForm = () => {
    const [user, setUser] = useState({})
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const params = useParams()
    const { userId } = params
    console.log('user', user.qualities)
    console.log('all', qualities)

    useEffect(() => {
        api.users.getById(userId).then((data) => {
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

    const validateSchema = yup.object().shape({
        email: yup.string().required('Электронная почта обязательна для заполнения').email('Email введен некорректно'),
        name: yup.string().required('Имя обязательно для заполнения')
    })

    const validate = () => {
        validateSchema.validate(user).then(() => setErrors({})).catch((err) => setErrors({ [err.path]: err.message }))
        return Object.keys(errors).length === 0
    }

    const handleChange = (target) => {
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const isValid = validate()
        if (!isValid) return

        api.users.update(userId, {
            ...user,
            qualities: getQualities(getUserQualitiesFormat(qualities)),
            profession: getProfessionById(user.profession._id)
        })
        history.push(`/users/${userId}`)
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

    const getUserQualitiesFormat = (qualities) => {
        const formatQualities = []
        for (const quality of qualities) {
            for (const userQ of user.qualities) {
                if (quality.value === userQ._id) {
                    formatQualities.push({
                        label: userQ.name,
                        value: userQ._id,
                        color: userQ.color
                    })
                }
            }
        }
        return formatQualities
    }

    return JSON.stringify(user) !== '{}'
        ? (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <h1>Edit</h1>
                            <TextField
                                label="Имя:"
                                onChange={handleChange}
                                value={user.name}
                                name="name"
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта:"
                                onChange={handleChange}
                                value={user.email}
                                name="email"
                                error={errors.email}
                            />
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
                                defaultValue={getUserQualitiesFormat(qualities)}
                            />
                            <button className="btn btn-primary w-100 mx-auto">Обновить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5} />
}

export default UserEditForm
