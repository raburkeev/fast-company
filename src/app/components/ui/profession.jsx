import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getProfessionById, getProfessionsLoadingStatus} from '../../store/professions'
import Loader from '../common/loader'

const Profession = ({id}) => {
    const profession = useSelector(getProfessionById(id))
    const isLoading = useSelector(getProfessionsLoadingStatus())

    return !isLoading ? <p>{profession.name}</p> : <Loader loadingTarget={'profession'}/>
}

Profession.propTypes = {
    id: PropTypes.string.isRequired
}

export default Profession
