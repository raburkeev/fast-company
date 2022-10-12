import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import {useAuth} from '../../hooks/useAuth'

const LoginForm = () => {
    const history = useHistory()
    const {signIn} = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    })
    const [errors, setErrors] = useState({})

    const validatorConfig = {
        email: {
            isRequired: {message: 'Электронная почта обязательна для заполнения'}
        },
        password: {
            isRequired: {message: 'Пароль обязателен для заполнения'}
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = validate()

        if (!isValid) return
        try {
            await signIn(data)
            history.push('/')
        } catch (error) {
            setErrors(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Submit</button>
        </form>

    )
}

export default LoginForm
