/*eslint-disable*/
import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import TextField from '../../common/form/textField'
import api from '../../../api'
import Loader from '../../common/loader'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backHistoryButton'
import {useProfessions} from '../../../hooks/useProfession'
import {useQualities} from '../../../hooks/useQuality'
import {useUsers} from '../../../hooks/useUsers'

const EditUserPage = () => {
    const history = useHistory()
    const {userId} = useParams()
    const {getUserById} = useUsers()
    const user = getUserById(userId)


    const {professions, isLoading: isProfessionsLoading, getProfession} = useProfessions()
    const professionsList = professions.map(prof => ({
        label: prof.name,
        value: prof._id
    }))
    const {qualities, isLoading: isQualitiesLoading, getQuality} = useQualities()
    const qualitiesList = qualities.map(qual => ({
        label: qual.name,
        value: qual._id
    }))
    const [isDataLoading, setDataLoading] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!isProfessionsLoading && !isQualitiesLoading) {
            setDataLoading(false)
        }
    }, [isProfessionsLoading, isQualitiesLoading])

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession,
        sex: user.sex,
        qualities: user.qualities
    })
    const getDefaultQualitiesFormat = (qualities) => {
        return qualities.map(q => getQuality(q)).map(qual => ({label: qual.name, value: qual._id}))
    }

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return {_id: prof.value, name: prof.label}
            }
        }
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

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const {profession, qualities} = data
        api.users.update(userId, {
            ...data,
            qualities: getQualities(qualities),
            profession: getProfessionById(profession)
        }).then(() => history.push(`/users/${userId}`))
        console.log(data)
    }

    const validateSchema = yup.object().shape({
        email: yup.string().required('Электронная почта обязательна для заполнения').email('Email введен некорректно'),
        name: yup.string().required('Имя обязательно для заполнения')
    })

    const validate = () => {
        validateSchema.validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({[err.path]: err.message}))
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const isValid = Object.keys(errors).length

    return !isDataLoading && (
            <div className="container mt-5">
                <BackHistoryButton/>
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <h1>Edit</h1>
                            <TextField
                                label="Имя:"
                                onChange={handleChange}
                                value={data.name}
                                name="name"
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта:"
                                onChange={handleChange}
                                value={data.email}
                                name="email"
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию:"
                                value={data.profession}
                                onChange={handleChange}
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    {name: 'Male', value: 'male'},
                                    {name: 'Female', value: 'female'},
                                    {name: 'Other', value: 'other'}
                                ]}
                                label="Выберите ваш пол:"
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                label="Ваши качества:"
                                onChange={handleChange}
                                name="qualities"
                                defaultValue={getDefaultQualitiesFormat(data.qualities)}
                            />
                            <button className="btn btn-primary w-100 mx-auto" disabled={isValid}>Обновить</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default EditUserPage
