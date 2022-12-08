import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as yup from 'yup'
import TextAreaField from '../form/textAreaField'
import {useDispatch} from 'react-redux'
import {createComment} from '../../../store/comments'

const AddCommentForm = () => {
    const dispatch = useDispatch()
    const {userId: pageId} = useParams()
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

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
        dispatch(createComment({...data, pageId}))
        setData({})
    }
    const validateSchema = yup.object().shape({
        content: yup.string().required('Поле обязательно для заполнения')
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

    const isValid = Object.keys(errors).length === 0

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <TextAreaField
                            label="Сообщение"
                            onChange={handleChange}
                            name="content"
                            value={data.content || ''}
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

export default AddCommentForm
