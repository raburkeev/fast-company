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

const EditUserPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: {},
        sex: '',
        qualities: []
    })
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})
    const [errors, setErrors] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
    const {userId} = useParams()

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

    const transformData = (data) => {
        return data.map(qual => ({label: qual.name, value: qual._id}))
    }

    useEffect(() => {
        Promise.all([api.users.getById(userId), api.qualities.fetchAll(), api.professions.fetchAll()]).then(data => {
            const userData = data[0]
            setData(prevState => ({
                ...prevState,
                ...userData,
                qualities: transformData(userData.qualities),
                profession: userData.profession._id
            }))

            const qualitiesData = data[1]
            const qualitiesList = Object.keys(qualitiesData).map(optionName => ({
                label: qualitiesData[optionName].name,
                value: qualitiesData[optionName]._id,
                color: qualitiesData[optionName].color
            }))
            setQualities(qualitiesList)

            const professionsData = data[2]
            const professionsList = Object.keys(professionsData).map(professionName => ({
                label: professionsData[professionName].name,
                value: professionsData[professionName]._id
            }))
            setProfessions(professionsList)
        })
    }, [])

    useEffect(() => {
        if (data._id) {
            setIsLoaded(true)
        }
    }, [data])

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

    return isLoaded
        ? (
            <div className="container mt-5">
                <BackHistoryButton />
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
                                options={(professions)}
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
                                options={qualities}
                                label="Ваши качества:"
                                onChange={handleChange}
                                name="qualities"
                                defaultValue={data.qualities}
                            />
                            <button className="btn btn-primary w-100 mx-auto" disabled={isValid}>Обновить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5}/>
}

export default EditUserPage
