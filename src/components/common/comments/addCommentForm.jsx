import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import api from '../../../api'
import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'
const initialData = {userId: '', content: ''}

const AddCommentForm = ({userId, comments, setComments}) => {
    const [data, setData] = useState(initialData)
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data))
    }, [])

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        api.comments.add({...data, pageId: userId}).then(data => setComments([...comments, data]))
        setData(initialData)
    }
    const validateSchema = yup.object().shape({
        content: yup.string().required('Поле обязательно для заполнения'),
        userId: yup.string().required('Поле обязательно для заполнения')
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

    const arrayOfUsers = users && Object.keys(users).map(userId => ({
        label: users[userId].name,
        value: users[userId]._id
    }))

    const isValid = Object.keys(errors).length === 0

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <SelectField
                            onChange={handleChange}
                            options={arrayOfUsers}
                            name="userId"
                            value={data.userId}
                            defaultOption="Выберите пользователя"
                            error={errors.userId}
                        />
                        <TextAreaField
                            label="Сообщение"
                            onChange={handleChange}
                            name="content"
                            value={data.content}
                            error={errors.content}
                        />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" disabled={!isValid}>Опубликовать</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

AddCommentForm.propTypes = {
    userId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired
}

export default AddCommentForm
